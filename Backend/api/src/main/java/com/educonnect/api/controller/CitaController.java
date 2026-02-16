package com.educonnect.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.educonnect.api.entity.Cita;
import com.educonnect.api.service.CitaService;

@RestController
@RequestMapping("/api/citas")
public class CitaController {

    @Autowired
    private CitaService citaService;

    @PostMapping
    public ResponseEntity<Cita> crear(@RequestBody Cita cita) {
        return ResponseEntity.ok(citaService.guardar(cita));
    }

    @GetMapping
    public List<Cita> obtenerTodos() {
        return citaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cita> obtenerPorId(@PathVariable Long id) {
        Cita cita = citaService.buscarPorId(id);
        return cita != null ? ResponseEntity.ok(cita) : ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/aceptar")
    public ResponseEntity<String> aceptar(@PathVariable Long id) {
        citaService.aceptarCita(id);
        return ResponseEntity.ok("La cita ha sido aceptada.");
    }

    @PatchMapping("/{id}/completar")
    public ResponseEntity<String> completar(@PathVariable Long id) {
        citaService.completarCita(id);
        return ResponseEntity.ok("Cita marcada como completada. ¡Ya se puede calificar!");
    }

    @PatchMapping("/{id}/rechazar")
    public ResponseEntity<String> rechazar(@PathVariable Long id) {
        citaService.rechazarCita(id);
        return ResponseEntity.ok("La cita ha sido rechazada.");
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<String> eliminar(@PathVariable Long id) {
        citaService.cancelar(id);
        return ResponseEntity.ok("La cita fue cancelada correctamente");
    }
}