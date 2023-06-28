package com.capstone.epicode.chess.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.epicode.chess.model.Comune;

@Repository
public interface ComuneRepository extends JpaRepository<Comune, Long>{

	public boolean existsByNome(String nome);
}
