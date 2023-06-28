package com.capstone.epicode.chess.model;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;

import com.capstone.epicode.chess.enums.StatoFattura;
import com.capstone.epicode.chess.repository.FatturaRepository;
import com.capstone.epicode.chess.service.FatturaService;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "fatture")
public class Fattura {

	@Id
	@SequenceGenerator(name = "seq2_id", sequenceName = "seq2_id", allocationSize = 1, initialValue = 1)
	@GeneratedValue(generator = "seq2_id")
	private Long id;

	@Enumerated(EnumType.STRING)
	private StatoFattura statofattura;
	private Integer anno;
	private LocalDate data;
	private Long importo;
	private int numero;
	
	@ManyToOne
	@JoinColumn(name = "cliente_detail")
	@JsonIgnore
	private Cliente cliente;
	
	@Override
	public String toString() {
		return "id:" + this.id + " " +" stato:"+ this.statofattura +" anno:"+ this.getAnno() +" numero:"+this.getNumero() +" importo:"+ this.getImporto();
	}
}
