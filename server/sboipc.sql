-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2023 at 04:46 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sboipc`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registro_usuario` (IN `documentoUsuario` INT, IN `nombresUsuario` VARCHAR(255), IN `apellidosUsuario` VARCHAR(255), IN `usuario` VARCHAR(255), IN `contrasena` VARCHAR(255), IN `idTipoGrafico` INT, IN `idRol` INT)   BEGIN
    INSERT INTO `tbl_usuarios` (
        `documentoUsuario`,
        `nombresUsuario`,
        `apellidosUsuario`,
        `usuario`,
        `contrasena`,
        `idTipoGrafico`,
        `idRol`
    )
    VALUES (
        documentoUsuario,
        nombresUsuario,
        apellidosUsuario,
        usuario,
        contrasena,
        idTipoGrafico,
        idRol
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_verificar_usuario` (IN `_usuario` VARCHAR(256), IN `_idRol` INT(11))   BEGIN
    SELECT
        *
    FROM
        tbl_usuarios
    WHERE
        usuario = _usuario AND idRol = _idRol;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_acciones_tarea`
--

CREATE TABLE `tbl_acciones_tarea` (
  `idAccionTarea` int(11) NOT NULL,
  `tipoAccionTarea` enum('asignar','finalizar','devolver','aprobar') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_clases_contrato`
--

CREATE TABLE `tbl_clases_contrato` (
  `idClaseContrato` int(11) NOT NULL,
  `claseContrato` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contratistas`
--

CREATE TABLE `tbl_contratistas` (
  `idContratista` int(11) NOT NULL,
  `cedulaORut` int(11) DEFAULT NULL,
  `tipoIdentificacion` varchar(100) DEFAULT NULL,
  `nombreCompleto` text DEFAULT NULL,
  `numeroNit` int(11) DEFAULT NULL,
  `naturalezaContratista` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contratos`
--

CREATE TABLE `tbl_contratos` (
  `idContrato` int(11) NOT NULL,
  `numeroContrato` int(11) DEFAULT NULL,
  `fechaSuscripcion` varchar(30) DEFAULT NULL,
  `objetoContrato` text DEFAULT NULL,
  `codigoSecop` varchar(250) DEFAULT NULL,
  `valorInicial` int(11) DEFAULT NULL,
  `fechaInicio` varchar(30) DEFAULT NULL,
  `fechaTerminacion` varchar(30) DEFAULT NULL,
  `fechaTerminacionProrroga` varchar(30) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `numProceso` int(11) DEFAULT NULL,
  `linkSecop` text DEFAULT NULL,
  `liderProceso` varchar(250) DEFAULT NULL,
  `plazoContrato` varchar(250) DEFAULT NULL,
  `idContratista` int(11) DEFAULT NULL,
  `idClaseContrato` int(11) DEFAULT NULL,
  `idModalidadSeleccion` int(11) DEFAULT NULL,
  `idOrdenadorGasto` int(11) DEFAULT NULL,
  `idSupervisor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_etapas_contractuales`
--

CREATE TABLE `tbl_etapas_contractuales` (
  `idEtapaContrac` int(11) NOT NULL,
  `tipoEtapaContrac` enum('preparatoria','precontractual','contractual','poscontractual') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_etapas_tarea`
--

CREATE TABLE `tbl_etapas_tarea` (
  `idEtapaTarea` int(11) NOT NULL,
  `tipoEtapaTarea` enum('por hacer','ejecutandose','terminada','aprobada') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_modalidades_seleccion`
--

CREATE TABLE `tbl_modalidades_seleccion` (
  `idModalidadSeleccion` int(11) NOT NULL,
  `modalidadSeleccion` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_observaciones`
--

CREATE TABLE `tbl_observaciones` (
  `idObservacion` int(11) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `observacion` text DEFAULT NULL,
  `idProceso` int(11) DEFAULT NULL,
  `idEtapaContrac` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ordenadores_gasto`
--

CREATE TABLE `tbl_ordenadores_gasto` (
  `idOrdenadorGasto` int(11) NOT NULL,
  `documentoOrdenador` int(11) DEFAULT NULL,
  `nombreCompleto` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_procesos`
--

CREATE TABLE `tbl_procesos` (
  `idProceso` int(11) NOT NULL,
  `nombreProceso` varchar(256) DEFAULT NULL,
  `numeroProceso` varchar(256) DEFAULT NULL,
  `idEtapaContrac` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_roles`
--

CREATE TABLE `tbl_roles` (
  `idRol` int(11) NOT NULL,
  `tipoRoll` enum('super usuario','usuario','usuario consulta','deshabilitado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_roles`
--

INSERT INTO `tbl_roles` (`idRol`, `tipoRoll`) VALUES
(1, 'super usuario'),
(2, 'usuario'),
(3, 'usuario consulta'),
(4, 'deshabilitado');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supervisores`
--

CREATE TABLE `tbl_supervisores` (
  `idSupervisor` int(11) NOT NULL,
  `cedulaORut` int(11) DEFAULT NULL,
  `modalidadSeleccion` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tareas`
--

CREATE TABLE `tbl_tareas` (
  `idTarea` int(11) NOT NULL,
  `descripcionTarea` varchar(256) DEFAULT NULL,
  `idEtapaContrac` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tareas_proceso`
--

CREATE TABLE `tbl_tareas_proceso` (
  `idTareaProceso` int(11) NOT NULL,
  `idTarea` int(11) DEFAULT NULL,
  `idEtapaTarea` int(11) DEFAULT NULL,
  `idProceso` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tipos_grafico`
--

CREATE TABLE `tbl_tipos_grafico` (
  `idTipoGrafico` int(11) NOT NULL,
  `tipoGrafico` enum('barras','lineas','pastel') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_tipos_grafico`
--

INSERT INTO `tbl_tipos_grafico` (`idTipoGrafico`, `tipoGrafico`) VALUES
(1, 'barras'),
(2, 'lineas'),
(3, 'pastel');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_trazabilidad_tareas`
--

CREATE TABLE `tbl_trazabilidad_tareas` (
  `idTrazabilidad` int(11) NOT NULL,
  `idTareaProceso` int(11) DEFAULT NULL,
  `idAccionTarea` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `idUsuario` int(11) NOT NULL,
  `documentoUsuario` int(11) DEFAULT NULL,
  `nombresUsuario` varchar(256) DEFAULT NULL,
  `apellidosUsuario` varchar(256) DEFAULT NULL,
  `usuario` varchar(256) DEFAULT NULL,
  `contrasena` varchar(256) DEFAULT NULL,
  `idTipoGrafico` int(11) DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`idUsuario`, `documentoUsuario`, `nombresUsuario`, `apellidosUsuario`, `usuario`, `contrasena`, `idTipoGrafico`, `idRol`) VALUES
(1, 1019983876, 'Miguel Angel', 'Campuzano Blandón', 'macampuzano67@soy.sena.edu.co', '$2a$10$Wc3fTAh/CCU505qbkbsEK.3gc/jkccYytArCDYVrFFUDQvmQlMgbq', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_acciones_tarea`
--
ALTER TABLE `tbl_acciones_tarea`
  ADD PRIMARY KEY (`idAccionTarea`);

--
-- Indexes for table `tbl_clases_contrato`
--
ALTER TABLE `tbl_clases_contrato`
  ADD PRIMARY KEY (`idClaseContrato`);

--
-- Indexes for table `tbl_contratistas`
--
ALTER TABLE `tbl_contratistas`
  ADD PRIMARY KEY (`idContratista`),
  ADD UNIQUE KEY `cedulaORut` (`cedulaORut`);

--
-- Indexes for table `tbl_contratos`
--
ALTER TABLE `tbl_contratos`
  ADD PRIMARY KEY (`idContrato`),
  ADD KEY `contratista_Contrato` (`idContratista`),
  ADD KEY `clase_contrato_Contrato` (`idClaseContrato`),
  ADD KEY `modalidad_seleccion_Contrato` (`idModalidadSeleccion`),
  ADD KEY `ordenador_gasto_Contrato` (`idOrdenadorGasto`),
  ADD KEY `supervisor_Contrato` (`idSupervisor`);

--
-- Indexes for table `tbl_etapas_contractuales`
--
ALTER TABLE `tbl_etapas_contractuales`
  ADD PRIMARY KEY (`idEtapaContrac`);

--
-- Indexes for table `tbl_etapas_tarea`
--
ALTER TABLE `tbl_etapas_tarea`
  ADD PRIMARY KEY (`idEtapaTarea`);

--
-- Indexes for table `tbl_modalidades_seleccion`
--
ALTER TABLE `tbl_modalidades_seleccion`
  ADD PRIMARY KEY (`idModalidadSeleccion`);

--
-- Indexes for table `tbl_observaciones`
--
ALTER TABLE `tbl_observaciones`
  ADD PRIMARY KEY (`idObservacion`),
  ADD KEY `etapa_contrac_obsevacion` (`idEtapaContrac`),
  ADD KEY `proceso_observacion` (`idProceso`),
  ADD KEY `usuario_observacion` (`idUsuario`);

--
-- Indexes for table `tbl_ordenadores_gasto`
--
ALTER TABLE `tbl_ordenadores_gasto`
  ADD PRIMARY KEY (`idOrdenadorGasto`),
  ADD UNIQUE KEY `documentoOrdenador` (`documentoOrdenador`);

--
-- Indexes for table `tbl_procesos`
--
ALTER TABLE `tbl_procesos`
  ADD PRIMARY KEY (`idProceso`),
  ADD KEY `etapa_contrac_proceso` (`idEtapaContrac`);

--
-- Indexes for table `tbl_roles`
--
ALTER TABLE `tbl_roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indexes for table `tbl_supervisores`
--
ALTER TABLE `tbl_supervisores`
  ADD PRIMARY KEY (`idSupervisor`),
  ADD UNIQUE KEY `cedulaORut` (`cedulaORut`);

--
-- Indexes for table `tbl_tareas`
--
ALTER TABLE `tbl_tareas`
  ADD PRIMARY KEY (`idTarea`),
  ADD KEY `etapa_contrac_tarea` (`idEtapaContrac`);

--
-- Indexes for table `tbl_tareas_proceso`
--
ALTER TABLE `tbl_tareas_proceso`
  ADD PRIMARY KEY (`idTareaProceso`),
  ADD KEY `tarea_tarea_proceso` (`idTarea`),
  ADD KEY `etapa_tarea_tarea` (`idEtapaTarea`),
  ADD KEY `proceso_tarea_proceso` (`idProceso`),
  ADD KEY `usuario_tareaProceso` (`idUsuario`);

--
-- Indexes for table `tbl_tipos_grafico`
--
ALTER TABLE `tbl_tipos_grafico`
  ADD PRIMARY KEY (`idTipoGrafico`);

--
-- Indexes for table `tbl_trazabilidad_tareas`
--
ALTER TABLE `tbl_trazabilidad_tareas`
  ADD PRIMARY KEY (`idTrazabilidad`),
  ADD KEY `tarea_proceso_trazabilidad` (`idTareaProceso`),
  ADD KEY `accion_tarea_trazabilidad_tareas` (`idAccionTarea`),
  ADD KEY `usuario_trazabilidad_tareas` (`idUsuario`);

--
-- Indexes for table `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `documentoUsuario` (`documentoUsuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `tipo_grafico_usuario` (`idTipoGrafico`),
  ADD KEY `rol_usuario` (`idRol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_acciones_tarea`
--
ALTER TABLE `tbl_acciones_tarea`
  MODIFY `idAccionTarea` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_clases_contrato`
--
ALTER TABLE `tbl_clases_contrato`
  MODIFY `idClaseContrato` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_contratistas`
--
ALTER TABLE `tbl_contratistas`
  MODIFY `idContratista` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_contratos`
--
ALTER TABLE `tbl_contratos`
  MODIFY `idContrato` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_etapas_contractuales`
--
ALTER TABLE `tbl_etapas_contractuales`
  MODIFY `idEtapaContrac` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_etapas_tarea`
--
ALTER TABLE `tbl_etapas_tarea`
  MODIFY `idEtapaTarea` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_modalidades_seleccion`
--
ALTER TABLE `tbl_modalidades_seleccion`
  MODIFY `idModalidadSeleccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_observaciones`
--
ALTER TABLE `tbl_observaciones`
  MODIFY `idObservacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_ordenadores_gasto`
--
ALTER TABLE `tbl_ordenadores_gasto`
  MODIFY `idOrdenadorGasto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_procesos`
--
ALTER TABLE `tbl_procesos`
  MODIFY `idProceso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_roles`
--
ALTER TABLE `tbl_roles`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_supervisores`
--
ALTER TABLE `tbl_supervisores`
  MODIFY `idSupervisor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tareas`
--
ALTER TABLE `tbl_tareas`
  MODIFY `idTarea` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tareas_proceso`
--
ALTER TABLE `tbl_tareas_proceso`
  MODIFY `idTareaProceso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_tipos_grafico`
--
ALTER TABLE `tbl_tipos_grafico`
  MODIFY `idTipoGrafico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_trazabilidad_tareas`
--
ALTER TABLE `tbl_trazabilidad_tareas`
  MODIFY `idTrazabilidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_contratos`
--
ALTER TABLE `tbl_contratos`
  ADD CONSTRAINT `clase_contrato_Contrato` FOREIGN KEY (`idClaseContrato`) REFERENCES `tbl_clases_contrato` (`idClaseContrato`),
  ADD CONSTRAINT `contratista_Contrato` FOREIGN KEY (`idContratista`) REFERENCES `tbl_contratistas` (`idContratista`),
  ADD CONSTRAINT `modalidad_seleccion_Contrato` FOREIGN KEY (`idModalidadSeleccion`) REFERENCES `tbl_modalidades_seleccion` (`idModalidadSeleccion`),
  ADD CONSTRAINT `ordenador_gasto_Contrato` FOREIGN KEY (`idOrdenadorGasto`) REFERENCES `tbl_ordenadores_gasto` (`idOrdenadorGasto`),
  ADD CONSTRAINT `supervisor_Contrato` FOREIGN KEY (`idSupervisor`) REFERENCES `tbl_supervisores` (`idSupervisor`);

--
-- Constraints for table `tbl_observaciones`
--
ALTER TABLE `tbl_observaciones`
  ADD CONSTRAINT `etapa_contrac_obsevacion` FOREIGN KEY (`idEtapaContrac`) REFERENCES `tbl_etapas_contractuales` (`idEtapaContrac`),
  ADD CONSTRAINT `proceso_observacion` FOREIGN KEY (`idProceso`) REFERENCES `tbl_procesos` (`idProceso`),
  ADD CONSTRAINT `usuario_observacion` FOREIGN KEY (`idUsuario`) REFERENCES `tbl_usuarios` (`idUsuario`);

--
-- Constraints for table `tbl_procesos`
--
ALTER TABLE `tbl_procesos`
  ADD CONSTRAINT `etapa_contrac_proceso` FOREIGN KEY (`idEtapaContrac`) REFERENCES `tbl_etapas_contractuales` (`idEtapaContrac`);

--
-- Constraints for table `tbl_tareas`
--
ALTER TABLE `tbl_tareas`
  ADD CONSTRAINT `etapa_contrac_tarea` FOREIGN KEY (`idEtapaContrac`) REFERENCES `tbl_etapas_contractuales` (`idEtapaContrac`);

--
-- Constraints for table `tbl_tareas_proceso`
--
ALTER TABLE `tbl_tareas_proceso`
  ADD CONSTRAINT `etapa_tarea_tarea` FOREIGN KEY (`idEtapaTarea`) REFERENCES `tbl_etapas_tarea` (`idEtapaTarea`),
  ADD CONSTRAINT `proceso_tarea_proceso` FOREIGN KEY (`idProceso`) REFERENCES `tbl_procesos` (`idProceso`),
  ADD CONSTRAINT `tarea_tarea_proceso` FOREIGN KEY (`idTarea`) REFERENCES `tbl_tareas` (`idTarea`),
  ADD CONSTRAINT `usuario_tareaProceso` FOREIGN KEY (`idUsuario`) REFERENCES `tbl_usuarios` (`idUsuario`);

--
-- Constraints for table `tbl_trazabilidad_tareas`
--
ALTER TABLE `tbl_trazabilidad_tareas`
  ADD CONSTRAINT `accion_tarea_trazabilidad_tareas` FOREIGN KEY (`idAccionTarea`) REFERENCES `tbl_acciones_tarea` (`idAccionTarea`),
  ADD CONSTRAINT `tarea_proceso_trazabilidad` FOREIGN KEY (`idTareaProceso`) REFERENCES `tbl_tareas_proceso` (`idTareaProceso`),
  ADD CONSTRAINT `usuario_trazabilidad_tareas` FOREIGN KEY (`idUsuario`) REFERENCES `tbl_usuarios` (`idUsuario`);

--
-- Constraints for table `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD CONSTRAINT `rol_usuario` FOREIGN KEY (`idRol`) REFERENCES `tbl_roles` (`idRol`),
  ADD CONSTRAINT `tipo_grafico_usuario` FOREIGN KEY (`idTipoGrafico`) REFERENCES `tbl_tipos_grafico` (`idTipoGrafico`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
