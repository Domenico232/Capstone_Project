package com.capstone.epicode.chess.model;

import java.time.LocalDate;

import com.capstone.epicode.chess.enums.TipoCliente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@NotNull
@Table(name = "indirizzi")
public class Indirizzo {
	
	 @Id
	 @SequenceGenerator(name = "seq3_id",sequenceName = "seq3_id", allocationSize = 1, initialValue = 1)
	 @GeneratedValue(generator = "seq3_id")	 private Long id;

	private String via;
	
	private String civico;
	
	private String localita;
	
	private String cap;
	
	@ManyToOne
	private Comune comune; 
}
