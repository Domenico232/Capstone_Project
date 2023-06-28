package com.capstone.epicode.chess.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.epicode.chess.enums.StatoFattura;
import com.capstone.epicode.chess.model.Cliente;
import com.capstone.epicode.chess.model.Comune;
import com.capstone.epicode.chess.model.Fattura;

@Repository
public interface FatturaRepository extends JpaRepository<Fattura, Long> {

	public List<Fattura> findBystatofattura(StatoFattura statofattura);

	public List<Fattura> findByData(LocalDate data);

	public List<Fattura> findByAnno(Integer anno);

	//@Query("SELECT c FROM Cliente c WHERE c.fatturatoAnnuale >= :minImporto OR c.fatturatoAnnuale <= :maxImporto")
	public List<Fattura> findByImportoBetween(long min,long max);

	public List<Fattura> findByClienteId(Long id);
	

}
