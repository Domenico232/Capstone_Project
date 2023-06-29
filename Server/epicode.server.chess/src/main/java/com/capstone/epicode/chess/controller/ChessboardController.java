package com.capstone.epicode.chess.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.capstone.epicode.chess.model.Chessboard;
import com.capstone.epicode.chess.service.ChessboardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chessboard")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ChessboardController {

    @Autowired ChessboardService chessboardService;
 
    
    @GetMapping
    public ResponseEntity<List<Chessboard>> getAllChessboards() {
    	return ResponseEntity.ok(chessboardService.getAll()); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chessboard> getChessboardById(@PathVariable("id") long id) {
    	return ResponseEntity.ok(chessboardService.getById(id)); 
    }

    @PostMapping
    public ResponseEntity<Chessboard> createChessboard(@RequestBody Chessboard chessboard) {
        Chessboard createdChessboard = chessboardService.addBoard(chessboard);
        return new ResponseEntity<>(createdChessboard, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Chessboard> updateChessboard(@PathVariable("id") long id, @RequestBody Chessboard chessboard) {
        Chessboard updatedChessboard = chessboardService.updateBoard(chessboard,id);
        if (updatedChessboard != null) {
            return new ResponseEntity<>(updatedChessboard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String deleteChessboard(@PathVariable("id") long id) {
        return chessboardService.deleteById(id);
    }
}