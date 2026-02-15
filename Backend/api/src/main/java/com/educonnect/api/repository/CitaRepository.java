package com.educonnect.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.educonnect.api.entity.Cita;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {
    
}