package com.educonnect.api.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.educonnect.api.entity.Cita;
import com.educonnect.api.entity.DuplicadoException;
import com.educonnect.api.entity.EstadoCita;
import com.educonnect.api.repository.CitaRepository;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;

    public Cita guardar(Cita cita) {
        boolean yaExiste = citaRepository.existsByMentorAndFechaHoraCitaAndEstadoNot(cita.getMentor(),
                cita.getFechaHoraCita(), cita.getEstado());
        if (yaExiste) {
            throw new DuplicadoException(
                    "El tutor ya tiene una cita programada para la fecha: " + cita.getFechaHoraCita());
        }
        if (citaRepository.existsByEstudianteAndFechaHoraCitaAndEstadoNot(cita.getEstudiante(), cita.getFechaHoraCita(),
                EstadoCita.CANCELADA)) {
            throw new DuplicadoException("Ya tienes otra cita programada a esa misma hora.");
        }
        cita.setEstado(EstadoCita.PENDIENTE);
        return citaRepository.save(cita);
    }

    public List<Cita> listarTodos() {
        return citaRepository.findAll();
    }

    public Cita buscarPorId(Long id) {
        return citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita con ID: " + id + " no encontrada"));
    }

    @Transactional
    public void aceptarCita(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        if (cita.getEstado() != EstadoCita.PENDIENTE) {
            throw new RuntimeException("Solo se pueden aceptar citas que estén en estado PENDIENTE");
        }
        cita.setEstado(EstadoCita.ACEPTADA);
    }

    @Transactional
    public void completarCita(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        if (cita.getEstado() != EstadoCita.ACEPTADA) {
            throw new RuntimeException("Solo se pueden completar citas que estén en estado ACEPTADA");
        }
        cita.setEstado(EstadoCita.COMPLETADA);
    }

    @Transactional
    public void rechazarCita(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        if (cita.getEstado() != EstadoCita.PENDIENTE) {
            throw new RuntimeException("No se puede rechazar una cita que ya fue procesada o finalizada");
        }
        cita.setEstado(EstadoCita.RECHAZADA);
    }

    @Transactional
    public void cancelar(Long id) {
        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        if (cita.getEstado() == EstadoCita.COMPLETADA) {
            throw new RuntimeException("No se puede cancelar una cita que ya fue completada");
        } else {
            cita.setEstado(EstadoCita.CANCELADA);
        }
    }
}