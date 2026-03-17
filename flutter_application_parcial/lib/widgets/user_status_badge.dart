import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/api_response.dart';
import '../providers/auth_providers.dart';

class UserStatusBadge extends StatelessWidget {
  const UserStatusBadge({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, authProvider, child) {
        final status = authProvider.userStatus;

        Color color;
        String text;
        IconData icon;

        switch (status) {
          case UserStatus.active:
            color = Colors.green;
            text = 'Activo';
            icon = Icons.check_circle;
            break;
          case UserStatus.inactive:
            color = Colors.orange;
            text = 'Inactivo';
            icon = Icons.pause_circle;
            break;
          case UserStatus.expired:
            color = Colors.red;
            text = 'Expirado';
            icon = Icons.timer_off;
            break;
          case UserStatus.error:
            color = Colors.grey;
            text = 'Error';
            icon = Icons.error;
            break;
          default:
            color = Colors.grey;
            text = 'Desconocido';
            icon = Icons.help;
        }

        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: color.withOpacity(0.5)),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, color: color, size: 14),
              const SizedBox(width: 4),
              Text(
                text,
                style: TextStyle(
                  color: color,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
