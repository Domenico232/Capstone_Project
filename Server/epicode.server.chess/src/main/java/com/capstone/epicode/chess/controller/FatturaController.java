package com.capstone.epicode.chess.controller;

import java.time.LocalDate;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.epicode.chess.enums.StatoFattura;
import com.capstone.epicode.chess.model.Cliente;
import com.capstone.epicode.chess.model.Fattura;
import com.capstone.epicode.chess.service.ClienteService;
import com.capstone.epicode.chess.service.FatturaService;

@RestController
@RequestMapping("/api/fatture")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FatturaController {

	@Autowired
	FatturaService fs;
	@Autowired 
	ClienteService cs;

	@GetMapping("/all")
	public ResponseEntity<?> getAll() {
		return ResponseEntity.ok(fs.getAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable long id) {
		return ResponseEntity.ok(fs.getById(id));
	}

	@PostMapping("/cliente/{idCliente}")
	public ResponseEntity<?> saveForCliente(@RequestBody Fattura fattura, @PathVariable long idCliente) {
	    Cliente cliente = cs.getById(idCliente); // Ottieni il cliente dal suo ID

	    if (cliente == null) {
	        return ResponseEntity.badRequest().body("Cliente non trovato");
	    }

	    fattura.setCliente(cliente); // Imposta il cliente per la fattura
	    Fattura savedFattura = fs.save(fattura); // Salva la fattura

	    return ResponseEntity.ok(savedFattura);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> save(@RequestBody Fattura fattura, @PathVariable long id) {
		return ResponseEntity.ok(fs.update(fattura, id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable long id) {
		return ResponseEntity.ok(fs.deleteById(id));
	}

	@GetMapping("/byIdCliente/{idCliente}")
	public ResponseEntity<?> getFattureByCliente(@PathVariable long idCliente) {
		return ResponseEntity.ok(fs.findByCliente(idCliente));
	}

	@GetMapping("/byStatoFatture/{statofattura}")
	public ResponseEntity<?> getByStatoFattura(@PathVariable StatoFattura statofattura) {
		return ResponseEntity.ok(fs.findBystatofattura(statofattura));
	}

	@GetMapping("/byAnnoFatture/{anno}")
	public ResponseEntity<?> getByAnnoFattura(@PathVariable int anno) {
		return ResponseEntity.ok(fs.findByAnno(anno));
	}

	@GetMapping("/byDataFatture/{data}")
	public ResponseEntity<?> getByDataFattura(@PathVariable LocalDate data) {
		return ResponseEntity.ok(fs.findByData(data));
	}

	@GetMapping(value = "/byRangeImportsFatture", params = { "min", "max" })
	public ResponseEntity<?> getRangeImportiFattura(@RequestParam long min, @RequestParam long max) {
		return ResponseEntity.ok(fs.findByRangeDiImporti(min, max));
	}

}
