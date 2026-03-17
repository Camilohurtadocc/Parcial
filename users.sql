-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2026 a las 02:55:46
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
(4, 'Camilo@gmail.com', 'camilo@gmail.com', '$2b$10$RHjaRNd/VXgi2ft8V0opfOzVX7fAfixP/4s2BmFm/idcyhTSvGt1i', 1, 1, '2026-03-17 01:20:02', NULL);

--
-- Índices para tablas volcadas
--

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `User_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

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
