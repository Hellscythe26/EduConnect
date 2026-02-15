package com.educonnect.api.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.educonnect.api.entity.Cita;
import com.educonnect.api.entity.DuplicadoException;
import com.educonnect.api.entity.EstadoCita;
import com.educonnect.api.entity.Resenia;
import com.educonnect.api.repository.CitaRepository;
import com.educonnect.api.repository.ReseniaRepository;

@Service
public class ReseniaService {

    @Autowired
    private ReseniaRepository reseniaRepository;

    @Autowired
    private CitaRepository citaRepository;

    public Resenia guardar(Resenia resenia) {
        Cita cita = citaRepository.findById(resenia.getCita().getCitaID())
                .orElseThrow(() -> new RuntimeException("La cita no existe"));
        if (cita.getEstado() != EstadoCita.COMPLETADA) {
            throw new RuntimeException("No puedes dejar una reseña para una cita que aún está " + cita.getEstado());
        }
        if (reseniaRepository.existsByCita(cita)) {
            throw new DuplicadoException("Esta cita ya tiene una reseña asociada.");
        }
        return reseniaRepository.save(resenia);
    }

    public List<Resenia> listarTodos() {
        return reseniaRepository.findAll();
    }

    public Resenia buscarPorId(Long id) {
        return reseniaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reseña con ID: " + id + " no encontrada"));
    }

    public void eliminar(Long id) {
        reseniaRepository.deleteById(id);
    }
}