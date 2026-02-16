package com.educonnect.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.educonnect.api.entity.Resenia;
import com.educonnect.api.service.ReseniaService;

@RestController
@RequestMapping("/api/resenias")
public class ReseniaController {
    
    @Autowired
    private ReseniaService reseniaService;

    @PostMapping
    public ResponseEntity<Resenia> crear(@RequestBody Resenia resenia) {
        return ResponseEntity.ok(reseniaService.guardar(resenia));
    }

    @GetMapping
    public List<Resenia> obtenerTodos() {
        return reseniaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resenia> obtenerPorId(@PathVariable Long id) {
        Resenia nuevaResenia = reseniaService.buscarPorId(id);
        return nuevaResenia != null ? ResponseEntity.ok(nuevaResenia) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        reseniaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}