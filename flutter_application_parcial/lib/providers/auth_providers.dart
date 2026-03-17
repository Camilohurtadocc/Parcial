import 'dart:async';
import 'package:flutter/material.dart';
import '../models/user_models.dart';
import '../models/api_response.dart';
import '../service/api_services.dart';

class AuthProvider extends ChangeNotifier {
  UserModel? _currentUser;
  bool _isLoading = false;
  String? _errorMessage;
  UserStatus? _userStatus;
  Timer? _statusCheckTimer;
  bool _loginSuccess = false;

  // Getters
  UserModel? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  UserStatus? get userStatus => _userStatus;
  bool get isAuthenticated => _currentUser != null;
  bool get isActive => _userStatus == UserStatus.active;
  bool get loginSuccess => _loginSuccess;

  // LOGIN
  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    _loginSuccess = false;
    notifyListeners();

    try {
      final ApiResponse response = await ApiService.login(email, password);

      print('📱 AuthProvider - Login Response Success: ${response.success}');
      print('📱 AuthProvider - Login Response Data: ${response.data}');

      if (response.success && response.data != null) {
        try {
          _currentUser = UserModel.fromJson(response.data);
          _userStatus = UserStatus.active;
          _loginSuccess = true;
          _startPeriodicStatusCheck();
          _isLoading = false;
          notifyListeners();
          print('✅ Login exitoso - Usuario: ${_currentUser?.email}');
          return true;
        } catch (parseError) {
          print('❌ Error parseando usuario: $parseError');
          _errorMessage = 'Error procesando datos del usuario';
          _loginSuccess = false;
          _isLoading = false;
          notifyListeners();
          return false;
        }
      } else {
        _errorMessage = response.message ?? 'Login fallido';
        _userStatus = response.userStatus;
        _loginSuccess = false;
        _isLoading = false;
        notifyListeners();
        print('❌ Login fallido: ${response.message}');
        return false;
      }
    } catch (e) {
      print('❌ Error inesperado en login: $e');
      _errorMessage = 'Error inesperado: ${e.toString()}';
      _userStatus = UserStatus.error;
      _loginSuccess = false;
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  // VERIFICAR STATUS
  Future<bool> checkUserStatus() async {
    if (_currentUser?.token == null) {
      _userStatus = UserStatus.expired;
      return false;
    }

    try {
      final ApiResponse response =
          await ApiService.checkUserStatus(_currentUser!.token!);

      _userStatus = response.userStatus ?? UserStatus.unknown;

      if (response.success && response.data != null) {
        _currentUser = UserModel.fromJson(response.data);
        notifyListeners();
        return true;
      } else if (response.statusCode == 401 || response.statusCode == 403) {
        await logout();
        return false;
      }

      return false;
    } catch (e) {
      _userStatus = UserStatus.error;
      notifyListeners();
      return false;
    }
  }

  // VERIFICACIÓN PERIÓDICA
  void _startPeriodicStatusCheck() {
    _statusCheckTimer?.cancel();
    _statusCheckTimer = Timer.periodic(
      const Duration(minutes: 2),
      (timer) async {
        if (_currentUser != null) {
          await checkUserStatus();
        } else {
          timer.cancel();
        }
      },
    );
  }

  // LOGOUT
  Future<void> logout() async {
    _statusCheckTimer?.cancel();
    if (_currentUser?.token != null) {
      await ApiService.logout(_currentUser!.token!);
    }
    _currentUser = null;
    _userStatus = null;
    _errorMessage = null;
    notifyListeners();
  }

  // LIMPIAR ERROR
  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  // RESETEAR LOGIN SUCCESS
  void resetLoginSuccess() {
    _loginSuccess = false;
    notifyListeners();
  }

  @override
  void dispose() {
    _statusCheckTimer?.cancel();
    super.dispose();
  }
}
