package com.skateClub.skateClub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skateClub.skateClub.model.funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<funcionario, Long> {

}
