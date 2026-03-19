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
    final nestedUser = json['user'];
    final source = nestedUser is Map<String, dynamic> ? nestedUser : json;

    return UserModel(
      id: source['id']?.toString() ??
          source['userId']?.toString() ??
          source['user_id']?.toString() ??
          '',
      email: source['email'] ?? '',
      name:
          source['name'] ?? source['username'] ?? source['fullName'] ?? 'Usuario',
      token: json['token'] ??
          json['accessToken'] ??
          json['access_token'] ??
          source['token'] ??
          source['accessToken'] ??
          source['access_token'],
      isActive: source['isActive'] ??
          source['active'] ??
          (source['status'] == 'active') ??
          true,
      role: source['role'] ?? source['rol'] ?? 'user',
      isVerified: source['isVerified'] ?? source['email_verified'] ?? false,
      lastLogin: source['lastLogin'] ?? source['ultimo_acceso'],
    );
  }
}
