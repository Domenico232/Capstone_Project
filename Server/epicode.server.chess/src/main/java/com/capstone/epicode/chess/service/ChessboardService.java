package com.capstone.epicode.chess.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capstone.epicode.chess.model.Chessboard;
import com.capstone.epicode.chess.repository.ChessboardRepository;
@Service
public class ChessboardService {
	@Autowired
	ChessboardRepository cr;
	
	public List<Chessboard> getAll(){
		return cr.findAll();
	}
	
	public Chessboard getById(long id){
		return cr.findById(id).get();
	}
	
	public Chessboard addBoard(Chessboard chessboard){
		return cr.save(chessboard);
	}
	
	public Chessboard updateBoard(Chessboard chessboard, long id) {
	return cr.save(chessboard);
	}
	
	public String deleteById(long id) {
		cr.deleteById(id);
		return "cancellato";
	}
}
