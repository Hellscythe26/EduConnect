CREATE DATABASE educonnectdb;
USE educonnectdb;

CREATE TABLE rol(
    rol_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario(
    usuario_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    foto VARCHAR(255),
    biografia TEXT,
    habilidades VARCHAR(255),
    rol_id BIGINT NOT NULL,
    activo TINYINT(1),
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES rol(rol_id)
);

CREATE TABLE cita(  
    cita_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id BIGINT NOT NULL,
    mentor_id BIGINT NOT NULL,
    fecha_hora_cita DATETIME NOT NULL,
    estado ENUM('PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'COMPLETADA', 'CANCELADA') DEFAULT 'PENDIENTE',
    CONSTRAINT fk_cita_estudiante FOREIGN KEY (estudiante_id) REFERENCES usuario(usuario_id),
    CONSTRAINT fk_cita_mentor FOREIGN KEY (mentor_id) REFERENCES usuario(usuario_id)
);

CREATE TABLE resenia(
    resenia_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cita_id BIGINT NOT NULL,
    estudiante_id BIGINT NOT NULL,
    comentario TEXT,
    estrellas INT CHECK (estrellas BETWEEN 1 AND 5),
    CONSTRAINT fk_resenia_cita FOREIGN KEY (cita_id) REFERENCES cita(cita_id),
    CONSTRAINT fk_resenia_estudiante FOREIGN KEY (estudiante_id) REFERENCES usuario(usuario_id)
);