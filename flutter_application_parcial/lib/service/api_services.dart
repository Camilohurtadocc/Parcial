import 'dart:async';
import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/api_response.dart';

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api_v1';
  static const String loginEndpoint = '/apiUserLogin';
  static const String verifyTokenEndpoint = '/apiUserVerifyToken';
  static const String logoutEndpoint = '/auth/logout';
  static const String userStatusEndpoint = '/user-status';

  static Future<ApiResponse> login(String email, String password) async {
    try {
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

      if (response.statusCode != 200) {
        return ApiResponse(
          success: false,
          message: 'Error del servidor: ${response.statusCode}',
          data: null,
          statusCode: response.statusCode,
        );
      }

      final jsonResponse = jsonDecode(response.body) as Map<String, dynamic>;

      return ApiResponse(
        success: true,
        message: jsonResponse['message'] ?? 'Login procesado',
        data: jsonResponse,
        statusCode: response.statusCode,
      );
    } on TimeoutException {
      return ApiResponse(
        success: false,
        message: 'Tiempo de espera agotado. Verifica que el servidor este corriendo.',
        data: null,
        statusCode: 408,
        userStatus: UserStatus.error,
      );
    } on http.ClientException catch (e) {
      return ApiResponse(
        success: false,
        message: 'Error de conexion: $e',
        data: null,
        statusCode: 500,
        userStatus: UserStatus.error,
      );
    } catch (e) {
      return ApiResponse(
        success: false,
        message: 'Error de conexion: ${e.toString()}',
        data: null,
        statusCode: 500,
        userStatus: UserStatus.error,
      );
    }
  }

  static Future<ApiResponse> checkUserStatus(String token) async {
    try {
      final response = await http
          .post(
            Uri.parse('$baseUrl$verifyTokenEndpoint'),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer $token',
            },
            body: jsonEncode({'token': token}),
          )
          .timeout(const Duration(seconds: 10));

      final jsonResponse = jsonDecode(response.body) as Map<String, dynamic>;

      UserStatus status;
      switch (response.statusCode) {
        case 200:
          final userData = jsonResponse['user'];
          bool isActive = true;
          if (userData is Map<String, dynamic> && userData['status'] != null) {
            final userStatus = userData['status'];
            isActive = userStatus == 1 ||
                userStatus == '1' ||
                userStatus == 'active' ||
                userStatus == true;
            jsonResponse['id'] = userData['id'];
            jsonResponse['role'] = userData['role'];
            jsonResponse['status'] = userData['status'];
            jsonResponse['token'] = token;
          } else {
            isActive = jsonResponse['isActive'] ?? jsonResponse['active'] ?? true;
          }
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

  static Future<ApiResponse> createUserStatus(
    String name, {
    String? description,
    required String userId,
    required String token,
  }) async {
    try {
      final response = await http
          .post(
            Uri.parse('$baseUrl$userStatusEndpoint'),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer $token',
            },
            body: jsonEncode({
              'name': name,
              'description': description,
              'userId': userId,
              'user_id': userId,
            }),
          )
          .timeout(const Duration(seconds: 10));

      final dynamic decodedBody =
          response.body.isEmpty ? <String, dynamic>{} : jsonDecode(response.body);
      final jsonResponse = decodedBody is Map<String, dynamic>
          ? decodedBody
          : <String, dynamic>{'data': decodedBody};

      return ApiResponse(
        success: response.statusCode == 200 || response.statusCode == 201,
        message: jsonResponse['message'] ?? 'Estado creado exitosamente',
        data: jsonResponse['data'] ?? jsonResponse,
        statusCode: response.statusCode,
      );
    } on TimeoutException {
      return ApiResponse(
        success: false,
        message: 'Tiempo de espera agotado al crear el estado.',
        data: null,
        statusCode: 408,
      );
    } catch (e) {
      return ApiResponse(
        success: false,
        message: 'Error de conexion: ${e.toString()}',
        data: null,
        statusCode: 500,
      );
    }
  }
}
