package com.educonnect.api.dto;

import lombok.Data;

@Data
public class CambiarPasswordDTO {
 
    private String passwordActual;
    private String passwordNueva;
}