package com.capstone.epicode.chess.model;

import java.time.LocalDate;

import com.capstone.epicode.chess.enums.TipoCliente;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvBindByPosition;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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
@Table(name = "comuni")
public class Comune {
	
	 @Id
	 @SequenceGenerator(name = "seq1_id",sequenceName = "seq1_id", allocationSize = 1, initialValue = 1)
	 @GeneratedValue(generator = "seq1_id")	 private Long id;
	
	 @CsvBindByName(column = "nome", required = true)
	 @CsvBindByPosition(position = 0, format = ";")
	private String nome;
	
	@ManyToOne
	private Provincia provincia;
	
}
