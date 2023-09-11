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
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY(id)
);

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