-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-06-2020 a las 04:43:18
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `renta`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE `contrato` (
  `idContrato` varchar(45) NOT NULL,
  `Arrendador` int(11) NOT NULL,
  `Inmueble` int(11) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaTermino` date NOT NULL,
  `Vigente` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `idInmueble` int(11) NOT NULL,
  `Propietario` int(11) NOT NULL,
  `NumHabitaciones` int(11) NOT NULL,
  `NumBaños` int(11) NOT NULL,
  `MascotasPermitidas` tinyint(4) NOT NULL,
  `CapacidadMaxima` int(11) NOT NULL,
  `CostoPorMes` double NOT NULL,
  `Calle` varchar(45) NOT NULL,
  `NumeroExterior` int(11) NOT NULL,
  `Colonia` varchar(45) NOT NULL,
  `Estado` varchar(45) NOT NULL,
  `Imagen` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`idInmueble`, `Propietario`, `NumHabitaciones`, `NumBaños`, `MascotasPermitidas`, `CapacidadMaxima`, `CostoPorMes`, `Calle`, `NumeroExterior`, `Colonia`, `Estado`, `Imagen`) VALUES
(5, 4, 5, 2, 0, 4, 5600, 'Guadalupe', 14, 'Calera', 'Puebla', '5.jpg'),
(6, 4, 5, 2, 1, 6, 4400, 'Prados', 994, 'Agua Azul', 'Puebla', '6.jpg'),
(7, 4, 4, 1, 0, 5, 5000, 'Cholula', 10, 'Cholula', 'Puebla', '7.jpg'),
(8, 4, 6, 2, 0, 8, 9300, 'San Andres', 999, 'Cholula', 'Puebla', '8.jpg'),
(9, 4, 5, 2, 1, 6, 10500, 'Lomas', 222, 'Angel', 'Puebla', '9.jpg'),
(10, 4, 2, 1, 1, 3, 5000, 'Palma', 12, 'Cerro', 'Puebla', '10.jpg'),
(11, 4, 4, 2, 0, 5, 10500, '102 sur', 132, 'Agua Azul', 'Puebla', '11.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idPersona` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Paterno` varchar(45) NOT NULL,
  `Materno` varchar(45) NOT NULL,
  `Estado` varchar(45) NOT NULL,
  `Pais` varchar(45) NOT NULL,
  `Email` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idPersona`, `Nombre`, `Paterno`, `Materno`, `Estado`, `Pais`, `Email`) VALUES
(4, 'Arturo', 'Tenorio', 'Lopez', 'Puebla', 'Mexico', 'arturo@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `Usuario` varchar(45) NOT NULL,
  `Contrasegna` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `idPersona`, `Usuario`, `Contrasegna`) VALUES
(4, 4, 'arturo123', 'arturo123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`idContrato`),
  ADD KEY `fk_Usuario_has_Inmueble_Inmueble1_idx` (`Inmueble`),
  ADD KEY `fk_Usuario_has_Inmueble_Usuario1_idx` (`Arrendador`);

--
-- Indices de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD PRIMARY KEY (`idInmueble`),
  ADD KEY `fk_Inmueble_Usuario1_idx` (`Propietario`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idPersona`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `fk_Usuario_Persona_idx` (`idPersona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `idInmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `fk_Usuario_has_Inmueble_Inmueble1` FOREIGN KEY (`Inmueble`) REFERENCES `inmueble` (`idInmueble`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuario_has_Inmueble_Usuario1` FOREIGN KEY (`Arrendador`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD CONSTRAINT `fk_Inmueble_Usuario1` FOREIGN KEY (`Propietario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_Usuario_Persona` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
