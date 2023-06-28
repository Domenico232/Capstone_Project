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
import com.capstone.epicode.chess.model.Cliente;
import com.capstone.epicode.chess.service.ClienteService;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/cliente")
public class ClienteController {

	@Autowired ClienteService cs;
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllClienti(){
		return ResponseEntity.ok(cs.getAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		return ResponseEntity.ok(cs.getById(id));
	}

	@PostMapping
	public ResponseEntity<?> save(@RequestBody Cliente cliente) {
		return ResponseEntity.ok(cs.addCliente(cliente));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> update(@PathVariable long id, @RequestBody Cliente cliente) {
		return ResponseEntity.ok(cs.putCliente(cliente, id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable long id) {
		return ResponseEntity.ok(cs.deleteCliente(id));
	}
	
	@GetMapping("/all/orderASC")
	public ResponseEntity<?> getAllOrderASC(){
		return ResponseEntity.ok(cs.orderByNameAsc());
	}
	
	@GetMapping("/all/orderSedeLegaleForProvinciaASC")
	public ResponseEntity<?> getAllOrderSedeLegaleForProvinciaASC(){
		return ResponseEntity.ok(cs.orderByIndirizzoSedeLegaleForProvincia());
	}
	
	@GetMapping("/all/orderNomeContattoASC")
	public ResponseEntity<?> orderByNameAsc(){
		return ResponseEntity.ok(cs.orderByNameAsc());
	}
	
	@GetMapping("/all/orderFatturaAnnualeASC")
	public ResponseEntity<?> orderByFatturaAnnuale(){
		return ResponseEntity.ok(cs.orderByFatturaAnnuale());
	}
	
	@GetMapping("/all/orderDataInserimento")
	public ResponseEntity<?> OrderByDataInserimentoAsc(){
		return ResponseEntity.ok(cs.OrderByDataInserimentoAsc());
	}
	
	
	@GetMapping(value="/all/fatturaAnnuale", params= {"fatturaAnnuale"})
	public ResponseEntity<?> findByFatturaAnnuale(@RequestParam long fatturaAnnuale){
		return ResponseEntity.ok(cs.findByFatturatoAnnuale(fatturaAnnuale));
	}
	
	@GetMapping(value="/all/dataInserimento", params= {"dataInserimento"})
	public ResponseEntity<?> findByDataInserimento(@RequestParam LocalDate dataInserimento){
		return ResponseEntity.ok(cs.findByDataInserimento(dataInserimento));
	}
	
	@GetMapping(value="/all/dataUltimoContatto", params= {"dataUltimoContatto"})
	public ResponseEntity<?> findByDataUltimoContatto(@RequestParam LocalDate dataUltimoContatto){
		return ResponseEntity.ok(cs.findByDataUltimoContatto(dataUltimoContatto));
	}
	
	@GetMapping(value="/all/parzialNomeContatto", params= {"parzialNomeContatto"})
	public ResponseEntity<?> filterByPartialName(@RequestParam String parzialNomeContatto){
		return ResponseEntity.ok(cs.filterByPartialName(parzialNomeContatto));
	}
}
