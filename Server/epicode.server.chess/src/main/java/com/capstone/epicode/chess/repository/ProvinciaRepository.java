package com.capstone.epicode.chess.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.epicode.chess.model.Provincia;

import java.util.List;


@Repository
public interface ProvinciaRepository extends JpaRepository<Provincia, Long>{
	
	public Provincia findByNome(String nome);

}
