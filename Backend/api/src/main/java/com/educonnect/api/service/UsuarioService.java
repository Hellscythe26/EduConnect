package com.educonnect.api.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.educonnect.api.dto.CambiarPasswordDTO;
import com.educonnect.api.dto.UsuarioDTO;
import com.educonnect.api.entity.DuplicadoException;
import com.educonnect.api.entity.Usuario;
import com.educonnect.api.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario guardar(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new DuplicadoException("El email: '" + usuario.getEmail() + "' ya esta asociado a otro usuario");
        }
        String passEncriptada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passEncriptada);
        usuario.setActivo(true);
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario con ID: " + id + " no encontrado"));
    }

    public Usuario buscarPorEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).filter(u -> u.getActivo()).orElse(null);
        if (usuario != null) {
            return usuario;
        }
        return null;
    }

    @Transactional
    public Usuario actualizarUsuario(Long id, UsuarioDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario con ID: " + id + " no encontrado"));
        if (dto.getEmail() != null && !dto.getEmail().equalsIgnoreCase(usuario.getEmail())) {
            if (usuarioRepository.existsByEmail(dto.getEmail())) {
                throw new DuplicadoException("El email: '" + dto.getEmail() + "' ya está asociado a otro usuario");
            }
            usuario.setEmail(dto.getEmail());
        }
        if (dto.getNombre() != null)
            usuario.setNombre(dto.getNombre());
        if (dto.getFoto() != null)
            usuario.setFoto(dto.getFoto());
        if (dto.getBiografia() != null)
            usuario.setBiografia(dto.getBiografia());
        if (dto.getHabilidades() != null)
            usuario.setHabilidades(dto.getHabilidades());
        return usuario;
    }

    @Transactional
    public void cambiarPassword(Long id, CambiarPasswordDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario con ID: " + id + " no encontrado"));
        if (dto.getPasswordNueva() == null || dto.getPasswordNueva().isBlank()) {
            throw new RuntimeException("La nueva contraseña no puede estar vacía");
        }
        if (!passwordEncoder.matches(dto.getPasswordActual(), usuario.getPassword())) {
            throw new RuntimeException("La contraseña actual no es correcta");
        }
        String passEncriptada = passwordEncoder.encode(dto.getPasswordNueva());
        usuario.setPassword(passEncriptada);
    }

    @Transactional
    public void eliminar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario con ID '" + id + "' no encontrado"));
        usuario.setActivo(false);
        String emailOriginal = usuario.getEmail();
        String nuevoEmail = "deleted_" + System.currentTimeMillis() + "_" + emailOriginal;
        usuario.setEmail(nuevoEmail);
        usuario.setNombre("Usuario Eliminado");
        usuario.setFoto(null);
        usuario.setBiografia(null);
        usuario.setHabilidades(null);
        usuarioRepository.save(usuario);
    }

    public Usuario validarCredenciales(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email).filter(u -> u.getActivo()).orElse(null);
        if (usuario != null && passwordEncoder.matches(password, usuario.getPassword())) {
            return usuario;
        }
        return null;
    }
}