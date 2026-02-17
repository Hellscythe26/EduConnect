package com.educonnect.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
 
    private String token;
    private Long usuarioID;
    private String nombre;
    private String email;
    private String rol;
}