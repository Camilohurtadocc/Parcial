enum UserStatus {
  active,
  inactive,
  expired,
  error,
  unknown,
}

class ApiResponse {
  final bool success;
  final String message;
  final dynamic data;
  final int statusCode;
  final UserStatus? userStatus;

  ApiResponse({
    required this.success,
    required this.message,
    this.data,
    required this.statusCode,
    this.userStatus,
  });

  factory ApiResponse.fromJson(Map<String, dynamic> json, int statusCode) {
    return ApiResponse(
      success: json['success'] ?? json['ok'] ?? statusCode == 200,
      message: json['message'] ?? json['msg'] ?? json['error'] ?? 'Sin mensaje',
      data: json['data'] ?? json['user'] ?? json,
      statusCode: statusCode,
      userStatus: _getUserStatusFromCode(statusCode, json),
    );
  }

  static UserStatus _getUserStatusFromCode(int code, Map<String, dynamic> json) {
    if (code == 200) {
      bool isActive = json['isActive'] ?? json['active'] ?? true;
      return isActive ? UserStatus.active : UserStatus.inactive;
    } else if (code == 401) {
      return UserStatus.expired;
    } else if (code == 403) {
      return UserStatus.inactive;
    } else if (code >= 500) {
      return UserStatus.error;
    }
    return UserStatus.unknown;
  }
}