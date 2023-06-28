package com.capstone.epicode.chess.model;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvBindByPosition;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data

public class ComuneDTOcsv {
	
		 @CsvBindByName(column = "nome", required = true)
		 @CsvBindByPosition(position = 0, format = ";")
		private String nome;
		

		 @CsvBindByName(column = "provincia", required = true)
		 @CsvBindByPosition(position = 1, format = ";")
	private String provincia;
}
