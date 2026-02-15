package com.educonnect.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.educonnect.api.entity.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {

    boolean existsByTipo(String tipo);    
}