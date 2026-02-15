package com.educonnect.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.educonnect.api.entity.Rol;
import com.educonnect.api.service.RolService;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "*")
public class RolController {
 
    @Autowired
    private RolService rolService;

    @PostMapping
    public ResponseEntity<Rol> crear(@RequestBody Rol rol) {
        return ResponseEntity.ok(rolService.guardar(rol));
    }

    @GetMapping
    public List<Rol> obtenerTodos() {
        return rolService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rol> obtenerPorID(@PathVariable Long id) {
        Rol rol = rolService.buscraPorId(id);
        return rol != null? ResponseEntity.ok(rol) : ResponseEntity.notFound().build();
    }
}