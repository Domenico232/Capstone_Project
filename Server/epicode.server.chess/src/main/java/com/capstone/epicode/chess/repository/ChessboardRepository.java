package com.capstone.epicode.chess.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.epicode.chess.model.Chessboard;

public interface ChessboardRepository extends JpaRepository<Chessboard, Long> {

}
