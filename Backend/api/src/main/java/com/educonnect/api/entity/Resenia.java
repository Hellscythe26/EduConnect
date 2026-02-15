package com.educonnect.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Resenia {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resenia_id")
    private Long reseniaId;

    @OneToOne
    @JoinColumn(name = "cita_id", nullable = false)
    private Cita cita;

    @OneToOne
    @JoinColumn(name = "estudiante_id", nullable = false)
    private Usuario estudiante;

    private String comentario;
    private int estrellas;
}