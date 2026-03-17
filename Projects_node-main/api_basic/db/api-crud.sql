-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2026 a las 14:47:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de datos: `api-crud`
--
CREATE DATABASE IF NOT EXISTS `api-crud` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `api-crud`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_users`
--

CREATE TABLE IF NOT EXISTS `api_users` (
    `Api_user_id` int(11) NOT NULL,
    `Api_user` varchar(60) NOT NULL,
    `Api_password` varchar(255) NOT NULL,
    `Api_role` enum('Admin', 'Read-only') NOT NULL,
    `Api_status` enum('Active', 'Inactive') NOT NULL,
    `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `Updated_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `api_users`
--

TRUNCATE TABLE `api_users`;
--
-- Volcado de datos para la tabla `api_users`
--

INSERT INTO
    `api_users` (
        `Api_user_id`,
        `Api_user`,
        `Api_password`,
        `Api_role`,
        `Api_status`,
        `Created_at`,
        `Updated_at`
    )
VALUES (
        1,
        'user@email.com',
        '$2b$10$A.RezjA04B1GcvfGDnnve.elhd56BPN.44qUtvgyVG5Jy8IkwxoFi',
        'Admin',
        'Active',
        '2026-01-01 17:00:00',
        NULL
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modules`
--

CREATE TABLE IF NOT EXISTS `modules` (
    `Modules_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `Modules_name` varchar(30) NOT NULL,
    `Modules_description` varchar(300) DEFAULT NULL,
    `Modules_route` varchar(80) DEFAULT NULL,
    `Modules_icon` varchar(30) DEFAULT NULL,
    `Modules_submodule` tinyint(3) NOT NULL DEFAULT 0,
    `Modules_parent_module` varchar(11) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`Modules_id`),
    UNIQUE KEY `Modules_name` (`Modules_name`)
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Truncar tablas antes de insertar `modules`
--

TRUNCATE TABLE `modules`;
--
-- Volcado de datos para la tabla `modules`
--

INSERT INTO
    `modules` (
        `Modules_id`,
        `Modules_name`,
        `Modules_description`,
        `Modules_route`,
        `Modules_icon`,
        `Modules_submodule`,
        `Modules_parent_module`,
        `created_at`,
        `updated_at`
    )
VALUES (
        1,
        'Dashboard',
        'This is dashboard',
        'dashboard',
        'bi-speedometer',
        0,
        'NULL',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        2,
        'User',
        'This is user',
        'user',
        'bi-person-circle',
        0,
        'NULL',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        3,
        'Module',
        'This is module',
        'module',
        'bi-box-fill',
        0,
        'NULL',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        4,
        'User Status',
        'This is module the User Status',
        'userStatus',
        'bi-people-fill',
        1,
        '2',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        5,
        'Role',
        'This is module the Role',
        'role',
        'bi-person-lock',
        1,
        '2',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        6,
        'Role Modules',
        'This is Role Modules',
        'roleModule',
        'bi-boxes',
        1,
        '3',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        7,
        'Permissions',
        'This is permissions',
        'permission',
        'bi-shield-lock-fill',
        0,
        NULL,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        8,
        'Document Type',
        'This is module Document types ',
        'documentTypes',
        'bi-file-earmark-person',
        1,
        '9',
        '2026-01-01 05:00:00',
        NULL
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
    `Roles_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `Roles_name` varchar(30) NOT NULL,
    `Roles_description` varchar(300) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`Roles_id`),
    UNIQUE KEY `Roles_name` (`Roles_name`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Truncar tablas antes de insertar `roles`
--

TRUNCATE TABLE `roles`;
--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO
    `roles` (
        `Roles_id`,
        `Roles_name`,
        `Roles_description`,
        `created_at`,
        `updated_at`
    )
VALUES (
        1,
        'Admin',
        'This is admin',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        2,
        'Client',
        'This is client',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        4,
        'Test',
        'This is test',
        '2026-01-01 05:00:00',
        NULL
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_modules`
--

CREATE TABLE IF NOT EXISTS `role_modules` (
    `RoleModules_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `Modules_fk` int(11) UNSIGNED DEFAULT NULL,
    `Roles_fk` int(11) UNSIGNED DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`RoleModules_id`),
    KEY `fk_modules_module` (`Modules_fk`),
    KEY `fk_modules_role` (`Roles_fk`)
) ENGINE = InnoDB AUTO_INCREMENT = 30 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Truncar tablas antes de insertar `role_modules`
--

TRUNCATE TABLE `role_modules`;
--
-- Volcado de datos para la tabla `role_modules`
--

INSERT INTO
    `role_modules` (
        `RoleModules_id`,
        `Modules_fk`,
        `Roles_fk`,
        `created_at`,
        `updated_at`
    )
VALUES (
        1,
        1,
        1,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        2,
        2,
        1,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        3,
        3,
        1,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        4,
        4,
        1,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        6,
        5,
        1,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        7,
        6,
        1,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        8,
        7,
        1,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        9,
        8,
        1,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        10,
        1,
        2,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        11,
        2,
        2,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        12,
        3,
        2,
        '2026-01-01 05:00:00',
        NULL
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
    `User_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `User_user` varchar(255) NOT NULL,
    `User_email` varchar(256) NOT NULL,
    `User_password` varchar(255) NOT NULL,
    `Roles_fk` int(11) UNSIGNED DEFAULT NULL,
    `User_status_fk` int(11) UNSIGNED DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`User_id`),
    UNIQUE KEY `User_user` (`User_user`),
    UNIQUE KEY `User_email` (`User_email`),
    KEY `fk_user_status` (`User_status_fk`),
    KEY `fk_user_role` (`Roles_fk`)
) ENGINE = InnoDB AUTO_INCREMENT = 152 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Truncar tablas antes de insertar `users`
--

TRUNCATE TABLE `users`;
--
-- Volcado de datos para la tabla `users`
--

INSERT INTO
    `users` (
        `User_id`,
        `User_user`,
        `User_email`,
        `User_password`,
        `Roles_fk`,
        `User_status_fk`,
        `created_at`,
        `updated_at`
    )
VALUES (
        1,
        'info@sinapsist.com.co',
        'info@sinapsist.com.co',
        '$2y$10$/F0Kxg/eZKVYX/Uq7GD6xO1IOfWYcYHgy10XrO7.GI7qkLB9yNFM2',
        2,
        1,
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        2,
        'd.casallas@gmail.com',
        'd.casallas@gmail.com',
        '$2y$10$iGi/r7LUy1rvxJYZ.txeP.dncmrFsxXqAWHY7QnvJvrD07PpiQ1KG',
        1,
        1,
        '2026-01-01 05:00:00',
        NULL
    );

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_status`
--

CREATE TABLE IF NOT EXISTS `user_status` (
    `User_status_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `User_status_name` varchar(30) NOT NULL,
    `User_status_description` varchar(300) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`User_status_id`),
    UNIQUE KEY `User_status_name` (`User_status_name`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Truncar tablas antes de insertar `user_status`
--

TRUNCATE TABLE `user_status`;
--
-- Volcado de datos para la tabla `user_status`
--

INSERT INTO
    `user_status` (
        `User_status_id`,
        `User_status_name`,
        `User_status_description`,
        `created_at`,
        `updated_at`
    )
VALUES (
        1,
        'Active',
        'Active',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        2,
        'Inactive',
        'Inactive',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        3,
        'Blocked',
        'Blocked',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        4,
        'Delete',
        'Delete',
        '2026-01-01 05:00:00',
        NULL
    );

--
-- Estructura de tabla para la tabla `profiles`
--

CREATE TABLE IF NOT EXISTS `profiles` (
    `Profile_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `Profile_name` varchar(30) NOT NULL,
    `Profile_description` varchar(300) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`Profile_id`),
    UNIQUE KEY `Profile_name` (`Profile_name`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

--
-- Volcado de datos para la tabla `profiles`
--

INSERT INTO
    `profiles` (
        `Profile_id`,
        `Profile_name`,
        `Profile_description`,
        `created_at`,
        `updated_at`
    )
VALUES (
        1,
        'Admin',
        'Administrator profile',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        2,
        'User',
        'Regular user profile',
        '2026-01-01 05:00:00',
        NULL
    ),
    (
        3,
        'Guest',
        'Guest user profile',
        '2026-01-01 05:00:00',
        NULL
    );

--
-- Restricciones para tablas volcadas
--

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;