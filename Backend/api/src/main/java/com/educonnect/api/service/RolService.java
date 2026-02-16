package com.educonnect.api.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.educonnect.api.entity.DuplicadoException;
import com.educonnect.api.entity.Rol;
import com.educonnect.api.repository.RolRepository;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public Rol guardar(Rol rol) {
        if(rolRepository.existsByTipo(rol.getTipo())) {
            throw new DuplicadoException("El tipo de rol '" + rol.getTipo() + "' ya está registrado.");
        }
        return rolRepository.save(rol);
    }

    public List<Rol> listarTodos() {
        return rolRepository.findAll();
    }

    public Rol buscarPorId(Long id) {
        return rolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rol con ID: " + id + " no encontrado"));
    }
}