package com.educonnect.api.repository;

import java.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.educonnect.api.entity.Cita;
import com.educonnect.api.entity.EstadoCita;
import com.educonnect.api.entity.Usuario;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    boolean existsByMentorAndFechaHoraCitaAndEstadoNot(Usuario mentor, LocalDateTime fechaHoraCita, EstadoCita cancelada);

    boolean existsByEstudianteAndFechaHoraCitaAndEstadoNot(Usuario estudiante, LocalDateTime fechaHoraCita,
            EstadoCita cancelada);
}