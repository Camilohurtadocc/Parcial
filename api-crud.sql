-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2026 a las 22:52:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `api-crud`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_users`
--

CREATE TABLE `api_users` (
  `Api_user_id` int(11) NOT NULL,
  `Api_user` varchar(60) NOT NULL,
  `Api_password` varchar(255) NOT NULL,
  `Api_role` enum('Admin','Read-only') NOT NULL,
  `Api_status` enum('Active','Inactive') NOT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `api_users`
--

INSERT INTO `api_users` (`Api_user_id`, `Api_user`, `Api_password`, `Api_role`, `Api_status`, `Created_at`, `Updated_at`) VALUES
(1, 'user@email.com', '$2b$10$A.RezjA04B1GcvfGDnnve.elhd56BPN.44qUtvgyVG5Jy8IkwxoFi', 'Admin', 'Active', '2026-01-01 17:00:00', NULL),
(0, 'camilo@gmail.com', '$2b$10$deAmpMyZuU0ISAk5Rw6tCO3V.sRrCqGMEZxzo4gyCXpxLmzLScJA2', 'Admin', 'Active', '2026-03-17 03:50:23', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modules`
--

CREATE TABLE `modules` (
  `Modules_id` int(11) UNSIGNED NOT NULL,
  `Modules_name` varchar(30) NOT NULL,
  `Modules_description` varchar(300) DEFAULT NULL,
  `Modules_route` varchar(80) DEFAULT NULL,
  `Modules_icon` varchar(30) DEFAULT NULL,
  `Modules_submodule` tinyint(3) NOT NULL DEFAULT 0,
  `Modules_parent_module` varchar(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `modules`
--

INSERT INTO `modules` (`Modules_id`, `Modules_name`, `Modules_description`, `Modules_route`, `Modules_icon`, `Modules_submodule`, `Modules_parent_module`, `created_at`, `updated_at`) VALUES
(1, 'Dashboard', 'Updated', 'dashboard', 'bi-speedometer', 0, NULL, '2026-01-01 05:00:00', '2026-02-27 08:20:18'),
(2, 'User', 'This is user', 'user', 'bi-person-circle', 0, 'NULL', '2026-01-01 05:00:00', NULL),
(3, 'Module', 'This is module', 'module', 'bi-box-fill', 0, 'NULL', '2026-01-01 05:00:00', NULL),
(4, 'User Status', 'This is module the User Status', 'userStatus', 'bi-people-fill', 1, '2', '2026-01-01 05:00:00', NULL),
(5, 'Role', 'This is module the Role', 'role', 'bi-person-lock', 1, '2', '2026-01-01 05:00:00', NULL),
(6, 'Role Modules', 'This is Role Modules', 'roleModule', 'bi-boxes', 1, '3', '2026-01-01 05:00:00', NULL),
(7, 'Permissions', 'This is permissions', 'permission', 'bi-shield-lock-fill', 0, NULL, '2026-01-01 05:00:00', NULL),
(10, 'Categotias', 'Main module', 'dashboard', 'bi-shield-lock-fill', 0, NULL, '2026-02-27 19:11:31', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profiles`
--

CREATE TABLE `profiles` (
  `Profile_id` int(11) UNSIGNED NOT NULL,
  `Profile_email` varchar(255) NOT NULL,
  `Profile_name` varchar(30) NOT NULL,
  `Profile_photo` varchar(255) DEFAULT NULL,
  `User_id_fk` int(11) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profiles`
--

INSERT INTO `profiles` (`Profile_id`, `Profile_email`, `Profile_name`, `Profile_photo`, `User_id_fk`, `created_at`, `updated_at`) VALUES
(2, 'laura@email.com', 'Laura', 'laura.png', 2, '2026-02-27 18:48:04', '2026-02-27 18:48:04'),
(3, 'Daniel@email.com', 'Daniel', 'Daniel.png', 3, '2026-02-28 00:23:42', '2026-02-28 00:23:42'),
(4, 'Daniel@email.com', 'Daniel', 'Daniel.png', 3, '2026-02-28 00:43:15', '2026-02-28 00:43:15'),
(9, 'camilo@gmail.com', 'camilo', 'camilo/foto.jpg', 2, '2026-03-17 20:29:27', '2026-03-17 20:29:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `Roles_id` int(11) UNSIGNED NOT NULL,
  `Roles_name` varchar(30) NOT NULL,
  `Roles_description` varchar(300) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`Roles_id`, `Roles_name`, `Roles_description`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'This is admin', '2026-01-01 05:00:00', NULL),
(2, 'Client', 'This is client', '2026-01-01 05:00:00', NULL),
(4, 'Test', 'This is test', '2026-01-01 05:00:00', NULL),
(5, 'camilo@gmail.com', '2', '2026-03-17 03:59:47', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_modules`
--

CREATE TABLE `role_modules` (
  `RoleModules_id` int(11) UNSIGNED NOT NULL,
  `Modules_fk` int(11) UNSIGNED DEFAULT NULL,
  `Roles_fk` int(11) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `role_modules`
--

INSERT INTO `role_modules` (`RoleModules_id`, `Modules_fk`, `Roles_fk`, `created_at`, `updated_at`) VALUES
(2, 2, 1, '2026-01-01 05:00:00', NULL),
(3, 3, 1, '2026-01-01 05:00:00', NULL),
(4, 4, 1, '2026-01-01 05:00:00', NULL),
(6, 5, 1, '2026-01-01 05:00:00', NULL),
(7, 6, 1, '2026-01-01 05:00:00', NULL),
(8, 7, 1, '2026-01-01 05:00:00', NULL),
(10, 1, 2, '2026-01-01 05:00:00', NULL),
(11, 2, 2, '2026-01-01 05:00:00', NULL),
(12, 3, 2, '2026-01-01 05:00:00', NULL),
(13, 1, 1, '2026-02-28 01:45:56', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `User_id` int(11) UNSIGNED NOT NULL,
  `User_user` varchar(255) NOT NULL,
  `User_email` varchar(256) NOT NULL,
  `User_password` varchar(255) NOT NULL,
  `Roles_fk` int(11) UNSIGNED DEFAULT NULL,
  `User_status_fk` int(11) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`User_id`, `User_user`, `User_email`, `User_password`, `Roles_fk`, `User_status_fk`, `created_at`, `updated_at`) VALUES
(1, 'info@sinapsist.com.co', 'info@sinapsist.com.co', '$2y$10$/F0Kxg/eZKVYX/Uq7GD6xO1IOfWYcYHgy10XrO7.GI7qkLB9yNFM2', 2, 1, '2026-01-01 05:00:00', NULL),
(2, 'd.casallas@gmail.com', 'd.casallas@gmail.com', '$2y$10$iGi/r7LUy1rvxJYZ.txeP.dncmrFsxXqAWHY7QnvJvrD07PpiQ1KG', 1, 1, '2026-01-01 05:00:00', NULL),
(3, 'usuario1@gmail.com', 'usuario1@gmail.com', '$2b$10$J.R1plkV8/MsKJYl4WZxoeIK2kgtP/mqKjklOltJhmT/UAT.cU/VS', 4, 1, '2026-02-27 02:01:27', NULL),
(6, 'Camilo@gmail.com', 'camilo@gmail.com', '$2b$10$QJ8t88499wjY87WMexit5OegSexewlNDj0UWjEcqImadYTkkRnIFa', 1, 1, '2026-03-17 23:11:18', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_status`
--

CREATE TABLE `user_status` (
  `User_status_id` int(11) UNSIGNED NOT NULL,
  `User_status_name` varchar(30) NOT NULL,
  `User_status_description` varchar(300) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `user_status`
--

INSERT INTO `user_status` (`User_status_id`, `User_status_name`, `User_status_description`, `created_at`, `updated_at`) VALUES
(1, 'Active', 'Active', '2026-01-01 05:00:00', NULL),
(2, 'Inactive', 'Inactive', '2026-01-01 05:00:00', NULL),
(3, 'Blocked', 'Blocked', '2026-01-01 05:00:00', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`Modules_id`),
  ADD UNIQUE KEY `Modules_name` (`Modules_name`);

--
-- Indices de la tabla `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`Profile_id`),
  ADD KEY `fk_profiles_user` (`User_id_fk`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`Roles_id`),
  ADD UNIQUE KEY `Roles_name` (`Roles_name`);

--
-- Indices de la tabla `role_modules`
--
ALTER TABLE `role_modules`
  ADD PRIMARY KEY (`RoleModules_id`),
  ADD KEY `fk_modules_module` (`Modules_fk`),
  ADD KEY `fk_modules_role` (`Roles_fk`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_id`),
  ADD UNIQUE KEY `User_user` (`User_user`),
  ADD UNIQUE KEY `User_email` (`User_email`),
  ADD KEY `fk_user_status` (`User_status_fk`),
  ADD KEY `fk_user_role` (`Roles_fk`);

--
-- Indices de la tabla `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`User_status_id`),
  ADD UNIQUE KEY `User_status_name` (`User_status_name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `modules`
--
ALTER TABLE `modules`
  MODIFY `Modules_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `profiles`
--
ALTER TABLE `profiles`
  MODIFY `Profile_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `Roles_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `role_modules`
--
ALTER TABLE `role_modules`
  MODIFY `RoleModules_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `User_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user_status`
--
ALTER TABLE `user_status`
  MODIFY `User_status_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `fk_profiles_user` FOREIGN KEY (`User_id_fk`) REFERENCES `users` (`User_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `role_modules`
--
ALTER TABLE `role_modules`
  ADD CONSTRAINT `fk_modules_module` FOREIGN KEY (`Modules_fk`) REFERENCES `modules` (`Modules_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_modules_role` FOREIGN KEY (`Roles_fk`) REFERENCES `roles` (`Roles_id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_roles` FOREIGN KEY (`Roles_fk`) REFERENCES `roles` (`Roles_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_status` FOREIGN KEY (`User_status_fk`) REFERENCES `user_status` (`User_status_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
