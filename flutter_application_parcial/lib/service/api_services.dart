import 'dart:convert';
import 'dart:async';
import 'package:http/http.dart' as http;
import '../models/api_response.dart';

class ApiService {
  // URL DEL API - Cambia según donde ejecutes:
  // - Android Emulator: http://10.0.2.2:3000/api_v1
  // - iOS Simulator: http://localhost:3000/api_v1
  // - Web (Chrome): http://localhost:3000/api_v1
  // - Dispositivo físico: http://192.168.x.x:3000/api_v1 (usa tu IP local)
  static const String baseUrl = 'http://localhost:3000/api_v1';

  static const String loginEndpoint = '/apiUserLogin';
  static const String perfilEndpoint = '/perfil';
  static const String logoutEndpoint = '/auth/logout';

  // LOGIN
  static Future<ApiResponse> login(String email, String password) async {
    try {
      print('🔍 Conectando a: $baseUrl$loginEndpoint');
      print('📧 Email: $email');
      print('🔑 Password: ${password.isEmpty ? "(vacío)" : "(lleno)"}');

      final response = await http
          .post(
            Uri.parse('$baseUrl$loginEndpoint'),
            headers: {'Content-Type': 'application/json'},
            body: jsonEncode({
              'email': email,
              'password': password,
            }),
          )
          .timeout(const Duration(seconds: 10));

      print('📡 Código: ${response.statusCode}');
      print('📦 Respuesta: ${response.body}');

      if (response.statusCode != 200) {
        return ApiResponse(
          success: false,
          message: 'Error del servidor: ${response.statusCode}',
          data: null,
          statusCode: response.statusCode,
        );
      }

      final jsonResponse = jsonDecode(response.body);

      return ApiResponse(
        success: response.statusCode == 200,
        message: jsonResponse['message'] ?? 'Login procesado',
        data: jsonResponse,
        statusCode: response.statusCode,
      );
    } on TimeoutException {
      return ApiResponse(
        success: false,
        message:
            'Tiempo de espera agotado. Verifica que el servidor esté corriendo.',
        data: null,
        statusCode: 408,
        userStatus: UserStatus.error,
      );
    } on http.ClientException catch (e) {
      print('❌ ClientException: $e');
      return ApiResponse(
        success: false,
        message:
            'Error de conexión: $e.\nVerifica que:\n1. El servidor esté corriendo\n2. La URL sea correcta\n3. Si usas emulador Android, usa http://10.0.2.2:3000',
        data: null,
        statusCode: 500,
        userStatus: UserStatus.error,
      );
    } catch (e) {
      print('❌ Error: $e');
      return ApiResponse(
        success: false,
        message: 'Error de conexión: ${e.toString()}',
        data: null,
        statusCode: 500,
        userStatus: UserStatus.error,
      );
    }
  }

  // VERIFICAR STATUS DEL USUARIO
  static Future<ApiResponse> checkUserStatus(String token) async {
    try {
      print('🔍 Verificando status...');

      final response = await http.get(
        Uri.parse('$baseUrl$perfilEndpoint'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      ).timeout(const Duration(seconds: 10));

      final jsonResponse = jsonDecode(response.body);

      UserStatus status;
      switch (response.statusCode) {
        case 200:
          bool isActive =
              jsonResponse['isActive'] ?? jsonResponse['active'] ?? true;
          status = isActive ? UserStatus.active : UserStatus.inactive;
          break;
        case 401:
          status = UserStatus.expired;
          break;
        case 403:
          status = UserStatus.inactive;
          break;
        default:
          status = UserStatus.unknown;
      }

      return ApiResponse(
        success: response.statusCode == 200,
        message: jsonResponse['message'] ?? 'Status verificado',
        data: jsonResponse,
        statusCode: response.statusCode,
        userStatus: status,
      );
    } catch (e) {
      return ApiResponse(
        success: false,
        message: 'Error: $e',
        data: null,
        statusCode: 500,
        userStatus: UserStatus.error,
      );
    }
  }

  // LOGOUT
  static Future<ApiResponse> logout(String token) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl$logoutEndpoint'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      return ApiResponse(
        success: response.statusCode == 200,
        message: 'Logout exitoso',
        data: null,
        statusCode: response.statusCode,
      );
    } catch (e) {
      return ApiResponse(
        success: false,
        message: 'Error: $e',
        data: null,
        statusCode: 500,
      );
    }
  }
}
