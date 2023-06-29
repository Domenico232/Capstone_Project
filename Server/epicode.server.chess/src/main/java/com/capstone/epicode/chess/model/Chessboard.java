package com.capstone.epicode.chess.model;

import java.util.List;

import com.capstone.epicode.chess.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "board")
public class Chessboard {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn( name = "player_1")
    private User primo;
    
//    private List<List<String>> board;
//    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn( name = "player_2")
    private User secondo;
    
}
