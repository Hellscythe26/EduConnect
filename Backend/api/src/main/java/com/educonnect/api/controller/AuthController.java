package com.educonnect.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.educonnect.api.config.JwtUtil;
import com.educonnect.api.dto.AuthResponse;
import com.educonnect.api.dto.LoginDTO;
import com.educonnect.api.entity.Usuario;
import com.educonnect.api.service.UsuarioService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        Usuario usuario = usuarioService.validarCredenciales(dto.getEmail(), dto.getPassword());
        if(usuario != null) {
            String token = jwtUtil.generateToken(usuario.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, usuario.getUsuarioID(), usuario.getNombre(), usuario.getEmail(), usuario.getRol().getTipo()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
    }
}