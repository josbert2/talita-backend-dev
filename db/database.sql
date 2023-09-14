-- CREATE DATABASE IF NOT EXISTS companydb;

-- USE companydb;

CREATE TABLE employee (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  salary INT(11) DEFAULT NULL, 
  PRIMARY KEY(id)
);

DESCRIBE employee;

INSERT INTO employee values 
  (1, 'Ryan Ray', 20000),
  (2, 'Joe McMillan', 40000),
  (3, 'John Carter', 50000);



SELECT * FROM employee;


CREATE TABLE menus (
  id INT(11) NOT NULL AUTO_INCREMENT,
  categoria_id INT(11) DEFAULT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) DEFAULT NULL,
  ingredientes VARCHAR(255) DEFAULT NULL,
  precio DECIMAL(10, 2) DEFAULT NULL,
  precioOferta DECIMAL(10, 2) DEFAULT NULL,
  stock INT(11) DEFAULT NULL,
  imagen VARCHAR(255) DEFAULT NULL,
  tipo VARCHAR(45) DEFAULT NULL,
  user_id INT(11) DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE categorias (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(id)
);

-- Alter table menus add column user_id INT(11) DEFAULT NULL;

INSERT INTO menus 
(nombre, precio, precioOferta, stock, imagen, tipo)
VALUES
('Pollo a la Brasa', 14.99, 12.99, 20, 'imagenes/pollo.jpg', 'Plato Principal'),
('Ensalada César', 6.99, 5.50, 30, 'imagenes/ensalada.jpg', 'Entrante'),
('Tiramisú', 5.99, NULL, 15, 'imagenes/tiramisu.jpg', 'Postre'),
('Pasta Carbonara', 10.99, 9.50, 25, 'imagenes/pasta.jpg', 'Plato Principal'),
('Jugo de Naranja', 3.50, NULL, 100, 'imagenes/jugo.jpg', 'Bebida');

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    rol ENUM('USER', 'ADMIN') DEFAULT 'USER',
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
);

CREATE TABLE menu_carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    menu_id INT,
    cantidad INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES menu_carts(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE
);

CREATE TABLE ventas (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    menu_id INT(11) NOT NULL,
    user_id INT(11) NOT NULL,
    cantidad INT(11) NOT NULL,
    precio_total DECIMAL(10, 2) NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (menu_id) REFERENCES menus(id),
    FOREIGN KEY (user_id) REFERENCES usuarios(id)
);

INSERT INTO ventas (menu_id, user_id, cantidad, precio_total, fecha_venta) VALUES 
(1, 1, 2, 21.98, '2023-09-14 12:00:00'),
(2, 2, 3, 26.97, '2023-09-14 12:30:00');