package com.capstone.epicode.chess.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.epicode.chess.enums.StatoFattura;
import com.capstone.epicode.chess.model.Cliente;
import com.capstone.epicode.chess.model.Fattura;
import com.capstone.epicode.chess.repository.ClientiRepo;
import com.capstone.epicode.chess.repository.FatturaRepository;
import com.github.javafaker.Faker;
import jakarta.persistence.EntityNotFoundException;

@Service
public class FatturaService {

	@Autowired
	FatturaRepository db;
	@Autowired
	ClienteService serviceCliente;
	@Autowired ClientiRepo dbCliente;

	Random random = new Random();

	//Creazione Fattura Fake
	public void createFakeFattura() {
		Faker fk = new Faker(new Locale("IT-it"));
		Fattura fattura = new Fattura();
		fattura.setAnno(fk.number().numberBetween(1999, 2024));
		fattura.setCliente(randomCliente());
		// da rivedere static/public metodo getRandomDateBetween
		fattura.setData(serviceCliente.getRandomDateBetween(LocalDate.of(2002, 01, 01), LocalDate.now()));
		// sistemare importo fattura - troppo grande
		fattura.setImporto((long)fk.random().nextInt(200000));
		fattura.setNumero(getLastFattura());
		StatoFattura[] statoFatture = StatoFattura.values();
		fattura.setStatofattura(statoFatture[random.nextInt(statoFatture.length)]);
		db.save(fattura);
	}
	
	//Recupero Cliente dal Db e assegnazione di un fattura in modo Casuale
	public Cliente randomCliente() {
		List<Cliente> listaClienti = serviceCliente.getAll();
		Cliente clienteRandom = listaClienti.get((int) random.nextLong(listaClienti.size() - 1));
		return clienteRandom;

	}

	//CRUD

	//Aggiunta di una fattura
	public Fattura save(Fattura f) {
		
		return db.save(f);
	}
	
	public Fattura getById(long id) {
		return db.findById(id).get();
	}
	
	//Ricerca per l'ultima fattura
	public int getLastFattura() {
		List<Fattura> allFatture = db.findAll();
		if (allFatture.size() > 0) {
			Fattura fattura = allFatture.get(allFatture.size() - 1);
			System.out.println(fattura.getId());
			return fattura.getNumero() + 1;
		} else {
			return 0;
		}

	}
	
	//Ricerca tutte fatture
	public List<Fattura> getAll() {
		return db.findAll();
	}

	//Cancelazione di una fattura
	public String deleteById(Long id) {
		db.deleteById(id);
		return "Fattura eleminata dal DataBase!";
	}
	
	//Modifica di una fattura
	public Fattura update(Fattura f, Long id) {
		if (!db.existsById(id)) {
			throw new EntityNotFoundException("Fattura non esiste nel DataBase!");
		}
		return db.save(f);
	}
	
	//Ricerca per stato fattura
	public List<Fattura> findBystatofattura(StatoFattura statofattura) {
		return db.findBystatofattura(statofattura);
	}
	
	//Ricerca per data fattura
	public List<Fattura> findByData(LocalDate data) {
		return db.findByData(data);
	}
	
	//Ricerca per Anno di fattura
	public List<Fattura> findByAnno(Integer anno) {
		return db.findByAnno(anno);
	}
	
	//Ricerca per Rage di importi
	public List<Fattura> findByRangeDiImporti(long min, long max) {
		return db.findByImportoBetween(min, max);
	}
	
	//Ricerca Fatture per cliente
	public List<Fattura> findByCliente(Long id){
		System.out.println(id);
		return db.findByClienteId(id);
	}
}
