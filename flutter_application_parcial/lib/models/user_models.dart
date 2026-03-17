class UserModel {
  final String id;
  final String email;
  final String name;
  final String? token;
  final bool isActive;
  final String? role;
  final bool isVerified;
  final String? lastLogin;

  UserModel({
    required this.id,
    required this.email,
    required this.name,
    this.token,
    required this.isActive,
    this.role,
    this.isVerified = false,
    this.lastLogin,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id']?.toString() ?? json['userId']?.toString() ?? '',
      email: json['email'] ?? '',
      name: json['name'] ?? json['username'] ?? json['fullName'] ?? 'Usuario',
      token: json['token'] ?? json['accessToken'] ?? json['access_token'],
      isActive: json['isActive'] ??
          json['active'] ??
          (json['status'] == 'active') ??
          true,
      role: json['role'] ?? json['rol'] ?? 'user',
      isVerified: json['isVerified'] ?? json['email_verified'] ?? false,
      lastLogin: json['lastLogin'] ?? json['ultimo_acceso'],
    );
  }

  String get statusMessage {
    if (!isActive) return 'Cuenta inactiva';
    if (!isVerified) return 'Email no verificado';
    return 'Activo';
  }
}
