package com.capstone.epicode.chess.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.epicode.chess.model.Comune;
import com.capstone.epicode.chess.model.Indirizzo;

public interface Indirizzorepo extends JpaRepository<Indirizzo, Long>{

}
