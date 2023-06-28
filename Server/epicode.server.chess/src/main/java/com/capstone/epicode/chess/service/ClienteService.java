package com.capstone.epicode.chess.service;

import java.lang.StackWalker.Option;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.commons.io.RandomAccessFileMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.capstone.epicode.chess.enums.TipoCliente;
import com.capstone.epicode.chess.model.Cliente;
import com.capstone.epicode.chess.model.Comune;
import com.capstone.epicode.chess.model.Fattura;
import com.capstone.epicode.chess.model.Indirizzo;
import com.capstone.epicode.chess.repository.ClientiRepo;
import com.capstone.epicode.chess.repository.Indirizzorepo;
import com.github.javafaker.Faker;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service

public class ClienteService{
	Faker fk = new Faker(new Locale("IT-it"));
	Random random = new Random();
	@Autowired
	ComuneService sc;
	@Autowired
	ClientiRepo dbcliente;
	@Autowired
	IndirizzoService dbindirizzo;
	
	//Creazione CLienti Fake
	public void Creafake() {

		Cliente cliente = new Cliente();
		cliente.setNomeContatto(fk.name().firstName());
		cliente.setCognomeContatto(fk.name().lastName());
		cliente.setDataInserimento(getRandomDateBetween(LocalDate.of(2002, 01, 01), LocalDate.now()));
		cliente.setDataUltimoContatto(getRandomDateBetween(LocalDate.of(2005, 01, 01), LocalDate.now()));
		cliente.setEmail(cliente.getCognomeContatto() + "." + cliente.getNomeContatto() + "@gmail.com");
		cliente.setEmailContatto(cliente.getCognomeContatto() + "." + cliente.getNomeContatto() + "@outlook.com");
		cliente.setFatturatoAnnuale((long)fk.random().nextInt(5000000));
		cliente.setIndirizzoSedeLegale(RandomAdress());
		cliente.setTelefonoContatto(fk.phoneNumber().cellPhone());
		cliente.setPartitaIva(fk.regexify("[0-9]{11}"));
		cliente.setRagioneSociale(fk.company().name());
		cliente.setIndirizzoSedeOperativa(RandomAdress());
		cliente.setTelefono(fk.phoneNumber().phoneNumber());
		cliente.setPec(cliente.getCognomeContatto() + "." + cliente.getNomeContatto() + "@pec.com");
		TipoCliente[] tipiCliente = TipoCliente.values();
		cliente.setTipoCliente(tipiCliente[random.nextInt(tipiCliente.length)]);
		dbcliente.save(cliente);

	}

	//metodo Generare date Random
	public  LocalDate getRandomDateBetween(LocalDate startDate, LocalDate endDate) {
		long startEpochDay = startDate.toEpochDay();
		long randomDay = ThreadLocalRandom.current().nextLong(startEpochDay, endDate.toEpochDay() + 1);
		return LocalDate.ofEpochDay(randomDay);
	}

	//metodo Generare indirizzi Random
	private Indirizzo RandomAdress() {
		Indirizzo indirizzo = new Indirizzo();
		indirizzo.setCap(fk.address().zipCode());
		indirizzo.setCivico(fk.address().buildingNumber());
		List<Comune> listacomuni = sc.GetAllComuni();
		indirizzo.setComune(sc.getById(random.nextLong(listacomuni.size() - 1)));
		indirizzo.setLocalita(indirizzo.getComune().getNome());
		indirizzo.setVia(fk.address().streetAddress());
		//dbindirizzo.Save(indirizzo);
		return indirizzo;
	}
	
	//Ricerca tutti clienti
	public List<Cliente> getAll(){
		return dbcliente.findAll();
	}
	
	//Ricerca cliente per Id
	public Cliente getById(Long id) {
		if(!dbcliente.existsById(id)) {
			throw new EntityNotFoundException("Cliente non presente nel DataBase!");
		}
		return dbcliente.findById(id).get();
	}
	
	//Aggiunta Nuovo Cliente
	public Cliente addCliente(Cliente cliente) {
		if(dbcliente.existsByEmail(cliente.getEmail())) {
			throw new EntityExistsException("Email già presente nel DataBase!");		
		}
		if(dbcliente.existsByEmailContatto(cliente.getEmailContatto())) {
			throw new EntityExistsException("EmailContatto già presente nel DataBase!");		
		}
		if(dbcliente.existsByPartitaIva(cliente.getPartitaIva())) {
			throw new EntityExistsException("Partita IVA già presente nel DataBase!");		
		}
		if(dbcliente.existsByPec(cliente.getPec())) {
			throw new EntityExistsException("Pec già presente nel DataBase!");		
		}
		if(dbcliente.existsByTelefono(cliente.getTelefono())) {
			throw new EntityExistsException("Telefono già presente nel DataBase!");		
		}
		if(dbcliente.existsByTelefonoContatto(cliente.getTelefonoContatto())) {
			throw new EntityExistsException("Telefono Contatto già presente nel DataBase!");		
		}
		
		return dbcliente.save(cliente);
	}

	//Modifica Cliente
	public Optional<?> putCliente(Cliente cliente, long id) {
		if(!dbcliente.existsById(id)) {
			throw new EntityNotFoundException("Cliente non esiste");
		}else {
			return Optional.of(dbcliente.save(cliente));
		}
	}
	
	//Cancellazione Cliente
	public String deleteCliente(Long id){
		if(!dbcliente.existsById(id)) {
			throw new EntityNotFoundException("Cliente non esiste");
		}
		dbcliente.deleteById(id);
		return "Cliente Cancellato";
	}
	
	//Ordinamento
	
	//Ordinamento Nome Cliente per ASC
	public List<Cliente> orderByNameAsc(){
		return dbcliente.OrderByNomeContattoAsc();
	}
	
	//Ordinamento per Fattura annuale
	public List<Cliente> orderByFatturaAnnuale(){
		return dbcliente.OrderByFatturatoAnnualeAsc();
	}
	
	//Ordinamento per Data Inserimento
	public List<Cliente> OrderByDataInserimentoAsc(){
		return dbcliente.OrderByDataInserimentoAsc();
	}
	
	//Ordinamento Sede Legale per Provincia
	public List<Cliente> orderByIndirizzoSedeLegaleForProvincia(){
		return dbcliente.orderBySedeLegaleProvincia();
	}
	
	
	//Filter
	
	//Ricerca per Fattura Annuale
		public List<Cliente> findByFatturatoAnnuale(long fatturato){
			return dbcliente.findByFatturatoAnnuale(fatturato);
		}
		
	//Riceraca per Data inserimento
		public List<Cliente> findByDataInserimento(LocalDate data){
			return dbcliente.findByDataInserimento(data);
		}
		
	//Ricerca per Data ultimo contatto	
		public List<Cliente> findByDataUltimoContatto(LocalDate data){
			return dbcliente.findByDataUltimoContatto(data);
		}
		
	//Ricerca per parte del Nome	
		public List<Cliente> filterByPartialName(String parteDelNome){
			return dbcliente.findByNomeContattoContainingIgnoreCase(parteDelNome);
		}
		
		
}
