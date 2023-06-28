package com.capstone.epicode.chess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.epicode.chess.model.Comune;
import com.capstone.epicode.chess.model.Provincia;
import com.capstone.epicode.chess.service.ComuneService;

@RestController
@RequestMapping("/api/comune")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ComuneController {
		
	@Autowired ComuneService cs;
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody Comune comune ) {
		return ResponseEntity.ok(cs.add(comune));
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable long id) {
		return ResponseEntity.ok(cs.getById(id));
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllProvince() {
		return ResponseEntity.ok(cs.GetAllComuni());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> putProvince(@PathVariable long id, @RequestBody Comune comune){
		return ResponseEntity.ok(cs.putComune(comune,id));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProvince(@PathVariable long id){
		return ResponseEntity.ok(cs.deleteComune(id));
	}
}
