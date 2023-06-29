package com.capstone.epicode.chess.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.epicode.chess.entity.User;
import com.capstone.epicode.chess.repository.UserRepository;
import com.github.javafaker.Faker;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

@Service

public class UserService{
	Faker fk = new Faker(new Locale("IT-it"));
	Random random = new Random();
	@Autowired
	UserRepository dbUser;

	//metodo Generare date Random
	public  LocalDate getRandomDateBetween(LocalDate startDate, LocalDate endDate) {
		long startEpochDay = startDate.toEpochDay();
		long randomDay = ThreadLocalRandom.current().nextLong(startEpochDay, endDate.toEpochDay() + 1);
		return LocalDate.ofEpochDay(randomDay);
	}

	//metodo Generare indirizzi Random
	
	//Ricerca tutti User
	public List<User> getAll(){
		return dbUser.findAll();
	}
	
	//Ricerca User per Id
	public User getById(Long id) {
		if(!dbUser.existsById(id)) {
			throw new EntityNotFoundException("User non presente nel DataBase!");
		}
		return dbUser.findById(id).get();
	}
	
	//Aggiunta Nuovo User
	public User addCliente(User user) {
		if(dbUser.existsByEmail(user.getEmail())) {
			throw new EntityExistsException("Email già presente nel DataBase!");		
		}
		return dbUser.save(user);
	}
	
	//Cancellazione Cliente
	public String deleteUser(Long id){
		if(!dbUser.existsById(id)) {
			throw new EntityNotFoundException("User non esiste");
		}
		dbUser.deleteById(id);
		return "User Cancellato";
	}

	public User putCliente(long id, User user) {
		//if(!dbUser.existsById(id)) {
			//throw new EntityNotFoundException("User non esiste");
		//}else {
			return dbUser.save(user);
		//}
	}

		
		
}
