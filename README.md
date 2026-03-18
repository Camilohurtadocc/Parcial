# Guía de Configuración y Ejecución del Proyecto (Parcial)

Este repositorio contiene un sistema completo con un **Backend en Node.js** y un **Frontend en Flutter**, utilizando una base de datos **MySQL**.

## 📌 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Flutter SDK](https://docs.flutter.dev/get-started/install)
- [XAMPP](https://www.apachefriends.org/index.html) o MySQL Server
- Un editor de código como [VS Code](https://code.visualstudio.com/) o [Android Studio](https://developer.android.com/studio)

---

## 🗄️ 1. Configuración de la Base de Datos

1. Abre tu gestor de base de datos (ej. phpMyAdmin en XAMPP).
2. Crea una base de datos llamada `api-crud`.
3. Importa el archivo `api-crud.sql` que se encuentra en la raíz de este proyecto.

---

## ⚙️ 2. Configuración del Backend (Node.js)

El backend se encuentra en la carpeta `Projects_node-main/api_basic`.

1. Abre una terminal y navega hasta la carpeta del backend:
   ```bash
   cd Projects_node-main/api_basic
   ```
2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
3. Verifica el archivo `.env` en esa misma carpeta. Asegúrate de que las credenciales coincidan con tu configuración local de MySQL:
   ```env
   SERVER_PORT='3000'
   DB_NAME='api-crud'
   DB_HOST='127.0.0.1'
   DB_USER='root'
   DB_PASSWORD=''
   DB_PORT='3306'
   ```
4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   *El servidor debería estar corriendo en `http://localhost:3000`.*

---

## 📱 3. Configuración del Frontend (Flutter)

El frontend se encuentra en la carpeta `flutter_application_parcial`.

1. Abre una nueva terminal y navega hasta la carpeta del frontend:
   ```bash
   cd flutter_application_parcial
   ```
2. Obtén las dependencias de Flutter:
   ```bash
   flutter pub get
   ```
3. **⚠️ Importante (Conexión API):**
   Si vas a ejecutar la aplicación en un **emulador Android** o un **dispositivo físico**, debes cambiar `localhost` por la IP de tu computadora en el archivo:
   `lib/service/api_services.dart` -> `baseUrl`.
   
   Ejemplo: `static const String baseUrl = 'http://192.168.1.XX:3000/api_v1';`

4. Ejecuta la aplicación:
   ```bash
   flutter run
   ```

---

## 🛠️ Solución de Problemas

- **Error de conexión (Connection Refused):** Asegúrate de que el backend esté corriendo y que la IP en Flutter sea la correcta (no uses `localhost` en dispositivos físicos).
- **Error de base de datos:** Verifica que el servicio de MySQL esté activo en XAMPP y que el nombre de la DB coincida.
- **JWT Error:** Si tienes errores de autenticación, verifica que el `JWT_SECRET` en el `.env` sea el mismo que usa el backend.

---

### Desarrollado por:
[Tu Nombre / Camilo Hurtado]
