-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 11-01-2024 a las 20:59:38
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `talita`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `added_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cart_items`
--

INSERT INTO `cart_items` (`cart_item_id`, `cart_id`, `menu_id`, `user_id`, `cantidad`, `added_at`) VALUES
(3, NULL, 15, 29, 2, '2023-09-16 00:44:15'),
(4, NULL, NULL, NULL, NULL, '2023-09-16 00:46:35'),
(5, NULL, NULL, NULL, NULL, '2023-09-16 00:47:14'),
(6, NULL, NULL, NULL, NULL, '2023-09-16 00:49:11'),
(7, NULL, NULL, NULL, NULL, '2023-09-16 00:49:54'),
(8, NULL, 15, 29, 1, '2023-09-16 00:50:39'),
(9, NULL, 15, 29, 1, '2023-09-16 00:50:54'),
(10, NULL, 15, 29, 1, '2023-09-16 17:50:33'),
(11, NULL, 15, 29, 1, '2023-09-16 18:40:21'),

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `svg_nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `svg_nombre`, `descripcion`, `createdAt`, `updatedAt`, `deleted`) VALUES
(5, 'Fruits & Vegetables', 'Fruits', NULL, '2023-09-15 17:06:16', '2024-01-05 15:33:06', 0),
(6, 'Meat & Fish', 'Meats', NULL, '2023-09-15 17:06:16', '2024-01-05 15:33:04', 0),
(7, 'Snacks', 'Snacks', NULL, '2023-09-15 17:06:16', '2024-01-05 15:33:02', 0),
(8, 'Pet Care', 'Pet', NULL, '2023-09-15 17:06:16', '2024-01-05 15:33:03', 0),
(9, 'Home & Cleaning', 'Home', NULL, '2023-09-15 17:06:16', '2024-01-05 15:33:06', 0),
(10, 'Dairy', 'Dairy', NULL, '2023-09-15 17:06:16', '2024-01-05 15:33:08', 0),
(11, 'Cooking', 'Cooking', NULL, '2023-09-15 17:06:16', '2024-01-05 15:33:09', 0),

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rut` varchar(222) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `telefono`, `direccion`, `email`, `password`, `rut`) VALUES
(1, 'qwrq', 'wrqwrq', 'wrqwrq', NULL, NULL, NULL, NULL),
(2, 'qwrq', 'wrqwrq', 'wrqwrq', NULL, NULL, NULL, NULL),
(3, 'qwrq', 'wrqwrq', 'wrqwrq', NULL, NULL, NULL, NULL),
(4, 'qwrq', 'wrqwrq', 'wrqwrq', 'wr.qwr-q', NULL, NULL, NULL),
(5, 'qwrq', 'wrqwrq', 'wrqwrq', 'wr.qwr-q', NULL, NULL, NULL),
(6, 'qwrq', 'wrqwrq', 'wrqwrq', 'wr.qwr-q', NULL, NULL, NULL),
(7, 'rqwrq', 'rqwrqwr', 'wqrq', 'q.rqw-r', NULL, NULL, NULL),
(8, 'sfsdfsd', 'fsdfsdf', 'fsdfsdf', 'qrq.wrs.dfs.dfs-d', NULL, NULL, NULL),
(9, 'dasdasd', 'sadasd', 'asdasdas', 'das.das-d', NULL, NULL, NULL),


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`id`, `name`, `salary`) VALUES
(1, 'Ryan Ray', 20000),
(2, 'Joe McMillan', 40000),
(3, 'John Carter', 50000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `ingredientes` varchar(255) DEFAULT NULL,
  `precio` int(100) DEFAULT NULL,
  `precioOferta` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `menus`
--

INSERT INTO `menus` (`id`, `categoria_id`, `nombre`, `descripcion`, `ingredientes`, `precio`, `precioOferta`, `stock`, `imagen`, `tipo`, `createdAt`, `updatedAt`, `user_id`) VALUES
(13, 14, 'We', 'rqwrqwr', NULL, 15000, NULL, NULL, 'https://res.cloudinary.com/dtas4wvbl/image/upload/v1694781895/x0xh4xnozxlppnjwx8rf.jpg', 'rqwrq', '2023-09-15 12:52:43', '2023-09-15 20:52:45', 2),
(14, 13, 'dasdasd', 'asdad', NULL, 123142, NULL, NULL, 'https://res.cloudinary.com/dtas4wvbl/image/upload/v1694812943/whj9fnpm5wezyjikdiou.jpg', '123124', '2023-09-15 21:22:23', '2023-09-15 21:22:23', 2),
(15, 15, 'Sushi 30 piezas - Nakikama', 'Sushi completo para 8 personas', NULL, 80000, NULL, NULL, 'https://res.cloudinary.com/dtas4wvbl/image/upload/v1694824216/rvgutynz100orpnx1w3o.jpg', 'Sushi', '2023-09-16 00:30:21', '2023-09-16 00:30:21', 2),
(16, 15, 'Sushi 30 piezas - Nakikama', 'Sushi completo para 8 personas', NULL, 80000, NULL, NULL, 'https://res.cloudinary.com/dtas4wvbl/image/upload/v1694824216/rvgutynz100orpnx1w3o.jpg', 'Sushi', '2023-09-16 00:30:21', '2023-09-16 00:30:21', 2),
(17, 15, 'Sushi 30 piezas - Nakikama', 'Sushi completo para 8 personas', NULL, 80000, NULL, NULL, 'https://res.cloudinary.com/dtas4wvbl/image/upload/v1694824216/rvgutynz100orpnx1w3o.jpg', 'Sushi', '2023-09-16 00:30:21', '2023-09-16 00:30:21', 2),
(18, 11, 'Sushi Wendy', 'Esto es un sushi', NULL, 15000, NULL, NULL, 'https://res.cloudinary.com/dtas4wvbl/image/upload/v1694894126/ox9gnldm9bxepd7s9hjy.png', 'Sushi', '2023-09-16 19:55:30', '2023-09-16 19:55:30', 2),
(19, 11, 'Novelas', 'rqwrqwr', NULL, 15000, NULL, NULL, 'https://res.cloudinary.com/dtas4wvbl/image/upload/v1695135553/hkcrmjgunjqlwa5y06nq.jpg', 'Sushi', '2023-09-19 14:59:14', '2023-09-19 14:59:14', 2),
(20, 15, 'Josbert', 'qwrq', NULL, 15000, NULL, NULL, 'https://res.cloudinary.com/dtas4wvbl/image/upload/v1695596633/acxemophyzd3rt0z7hyv.png', 'Sushi', '2023-09-24 23:03:54', '2023-09-24 23:03:54', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu_carts`
--

CREATE TABLE `menu_carts` (
  `cart_id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `menu_carts`
--

INSERT INTO `menu_carts` (`cart_id`, `usuario_id`, `created_at`) VALUES
(2, NULL, '2023-09-12 01:30:03'),
(3, NULL, '2023-09-12 01:30:56'),
(4, NULL, '2023-09-12 01:31:30'),
(5, NULL, '2023-09-16 00:45:49'),
(6, NULL, '2023-09-16 00:46:25'),
(7, NULL, '2023-09-16 00:46:35'),
(8, NULL, '2023-09-16 00:47:14'),
(9, NULL, '2023-09-16 00:49:11'),
(10, NULL, '2023-09-16 00:49:54'),
(11, 62, '2024-01-06 17:25:54'),
(12, 61, '2024-01-07 15:58:12'),
(13, 63, '2024-01-11 02:22:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderdetails`
--

CREATE TABLE `orderdetails` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `item_price` decimal(10,2) NOT NULL,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orderdetails`
--

INSERT INTO `orderdetails` (`order_detail_id`, `order_id`, `menu_id`, `categoria_id`, `id_usuario`, `quantity`, `item_price`, `notes`) VALUES
(96, 97, 16, 15, 29, 1, '80000.00', NULL),
(97, 98, 13, 14, 29, 4, '15000.00', NULL),
(98, 99, 20, 15, 29, 1, '15000.00', NULL),
(99, 100, 13, 14, 29, 1, '15000.00', NULL),

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `table_number` int(11) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `status` enum('Pending','Preparing','Ready','Served','Paid','Cancelled','Completed') NOT NULL DEFAULT 'Pending',
  `total_price` int(11) NOT NULL,
  `special_instructions` text,
  `for_takeout` tinyint(1) NOT NULL DEFAULT '0',
  `method_payment` varchar(256) NOT NULL,
  `client_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`order_id`, `table_number`, `order_date`, `status`, `total_price`, `special_instructions`, `for_takeout`, `method_payment`, `client_id`, `created_at`, `updated_at`) VALUES
(97, 5, '2024-01-03', 'Completed', 800000, 'Sin sal', 0, 'Transferencia', 46, '2023-09-24 22:53:59', '2024-01-06 17:15:38'),
(98, 5, '2024-01-06', 'Completed', 200000, 'Sin sal', 1, 'Efectivo', 48, '2023-09-24 22:54:38', '2024-01-08 02:24:08'),
(99, 5, '2023-09-24', 'Completed', 15000, 'Sin sal', 0, 'Transferencia', 49, '2023-09-24 23:04:37', '2023-09-27 00:43:19'),
(100, 5, '2023-09-25', 'Completed', 138142, 'Sin sal', 0, 'Efectivo', 55, '2023-09-25 03:12:48', '2023-09-27 00:18:28'),


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `hashedPassword` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rol` enum('USER','ADMIN') DEFAULT 'USER',
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `hashedPassword`, `salt`, `fecha_creacion`, `fecha_actualizacion`, `rol`, `status`) VALUES
(61, 'Josbert', NULL, 'topisima@topisima.com', '$2b$10$FMD18PXTrUgb7qm8CG.cmebhyRF8NMM72fdGVzBn.E318SiIdGyk6', NULL, '2024-01-05 03:53:35', '2024-01-05 03:53:35', 'USER', 'ACTIVE'),
(62, 'jos', NULL, 'jos@gmail.cl', '$2b$10$ro7SqThltRJRmHL88/50WOPT5AC.nDNe1rrmKgOHqKADrCjJlehTO', NULL, '2024-01-05 03:54:02', '2024-01-05 03:54:02', 'USER', 'ACTIVE'),
(63, 'Keiber1', NULL, 'joheandroid@gmail.com', '$2b$10$su/xYsUKMkR8tDllJNEU4.aPf478R0xinvrtFbK/gk.wQMdqIkaLK', NULL, '2024-01-11 02:21:51', '2024-01-11 04:53:09', 'USER', 'ACTIVE');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menu_carts`
--
ALTER TABLE `menu_carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=389;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `menu_carts`
--
ALTER TABLE `menu_carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `menu_carts` (`cart_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `menu_carts`
--
ALTER TABLE `menu_carts`
  ADD CONSTRAINT `menu_carts_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



CREATE TABLE Cuadratura (
    id INT PRIMARY KEY,
    codigo VARCHAR(255),
    fecha DATE,
    ultimo_cierre DATETIME,
    saldo_inicial DECIMAL(10, 2),
    monto_ingresos DECIMAL(10, 2),
    monto_egresos DECIMAL(10, 2),
    recaudacion DECIMAL(10, 2),
    monto DECIMAL(10, 2),
    ajuste DECIMAL(10, 2),
    monto_credito DECIMAL(10, 2),
    cantidad_credito INT,
    monto_debito DECIMAL(10, 2),
    cantidad_debito INT,
    created DATETIME,
    updated DATETIME,
    deleted BOOLEAN
);

CREATE TABLE CajaIngreso (
    id INT PRIMARY KEY,
    caja_id INT,
    cuadratura_id INT,
    staff_id INT,
    codigo VARCHAR(255),
    saldo_inicial DECIMAL(10, 2),
    monto DECIMAL(10, 2),
    created DATETIME,
    updated DATETIME,
    deleted BOOLEAN,
    FOREIGN KEY (cuadratura_id) REFERENCES Cuadratura(id),
    FOREIGN KEY (staff_id) REFERENCES Staff(id)
);


CREATE TABLE CajaEgreso (
    id INT PRIMARY KEY,
    caja_id INT,
    cuadratura_id INT,
    staff_id INT,
    codigo VARCHAR(255),
    tipo VARCHAR(255),
    saldo_inicial DECIMAL(10, 2),
    monto DECIMAL(10, 2),
    created DATETIME,
    updated DATETIME,
    deleted BOOLEAN,
    FOREIGN KEY (cuadratura_id) REFERENCES Cuadratura(id),
    FOREIGN KEY (staff_id) REFERENCES Staff(id)
);



CREATE TABLE Caja (
    id INT PRIMARY KEY,
    nombre VARCHAR(255),
    saldo_inicial DECIMAL(10, 2),
    ultima_cuadratura DATETIME,
    activo BOOLEAN,
    created DATETIME,
    updated DATETIME,
    deleted BOOLEAN
);