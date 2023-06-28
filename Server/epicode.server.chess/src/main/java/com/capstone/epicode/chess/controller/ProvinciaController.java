package com.capstone.epicode.chess.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.epicode.chess.model.Provincia;
import com.capstone.epicode.chess.service.ProvinciaService;

@RestController
@RequestMapping("/api/provincia")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProvinciaController {
	
	@Autowired ProvinciaService ps;
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody Provincia provincia) {
		return ResponseEntity.ok(ps.save(provincia));
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable long id) {
		return ResponseEntity.ok(ps.getById(id));
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllProvince() {
		return ResponseEntity.ok(ps.GetAllIndirizzo());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> putProvince(@PathVariable long id, @RequestBody Provincia provincia){
		return ResponseEntity.ok(ps.putProvincia(provincia,id));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProvince(@PathVariable long id){
		return ResponseEntity.ok(ps.deleteIndirizzo(id));
	}
}
