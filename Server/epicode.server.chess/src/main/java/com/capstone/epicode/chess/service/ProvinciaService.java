package com.capstone.epicode.chess.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.epicode.chess.model.Indirizzo;
import com.capstone.epicode.chess.model.Provincia;
import com.capstone.epicode.chess.repository.ProvinciaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProvinciaService {
	
	@Autowired ProvinciaRepository db;
	//Creazione di una Provincia
	public Provincia save(Provincia p) {
		return db.save(p);
	}
	
	//Ricerca per nome
	public Provincia FindByName(String name) {
	return db.findByNome(name);
}
	
	//Ricerca Provincia per Id
	public Provincia getById(Long id) {
		return db.findById(id).get();
	}
	
	//Ricerca tutti Provincia
	public List<Provincia> GetAllIndirizzo(){
		return db.findAll();
		
	}
	
	//Modifica Provincia
	public Optional<?> putProvincia(Provincia provincia,long id) {
		if(!db.existsById(id)) {
			throw new EntityNotFoundException("Provincia non esiste");
		}else {
			return Optional.of(db.save(provincia));
		}
	}
	
	//Cancellazione
	public String deleteIndirizzo(Long id){
		db.deleteById(id);
		return "Provincia Cancellato";
	}	

}
