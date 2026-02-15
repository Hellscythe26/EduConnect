package com.educonnect.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educonnect.api.entity.Cita;
import com.educonnect.api.entity.Resenia;

@Repository
public interface ReseniaRepository extends JpaRepository<Resenia, Long> {

    boolean existsByCita(Cita cita);
    
}