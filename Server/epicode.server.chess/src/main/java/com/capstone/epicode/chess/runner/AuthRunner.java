package com.capstone.epicode.chess.runner;

import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections4.Get;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.capstone.epicode.chess.entity.ERole;
import com.capstone.epicode.chess.entity.Role;
import com.capstone.epicode.chess.enums.StatoFattura;
import com.capstone.epicode.chess.model.Comune;
import com.capstone.epicode.chess.model.ComuneDTOcsv;
import com.capstone.epicode.chess.model.Provincia;
import com.capstone.epicode.chess.payload.RegisterDto;
import com.capstone.epicode.chess.repository.RoleRepository;
import com.capstone.epicode.chess.repository.UserRepository;
import com.capstone.epicode.chess.service.AuthService;
import com.capstone.epicode.chess.service.AuthServiceImpl;
import com.capstone.epicode.chess.service.ClienteService;
import com.capstone.epicode.chess.service.ComuneService;
import com.capstone.epicode.chess.service.FatturaService;
import com.capstone.epicode.chess.service.ProvinciaService;
import com.opencsv.bean.CsvToBeanBuilder;

@Component
public class AuthRunner implements ApplicationRunner {
@Autowired AuthServiceImpl auth;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	AuthService authService;
	@Autowired
	ComuneService comuneService;
	@Autowired
	ProvinciaService provService;
	@Autowired
	ClienteService cliservice;
	@Autowired FatturaService dbFattura;
	private Set<Role> adminRole;
	private Set<Role> moderatorRole;
	private Set<Role> userRole;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		// Metodo da lanciare solo la prima volta
		// Serve per salvare i ruoli nel DB
		setRoleDefault();

		saveProvinceDb();

		saveComuniDb();

		Creaclienti(25);
		creaFattura(50);
		createadmin();
		
		//System.out.println(dbFattura.findBystatofattura(StatoFattura.CONSEGNATO));
		//System.out.println(dbFattura.findBystatofattura(StatoFattura.ACCETTATO));
		//System.out.println(dbFattura.findBystatofattura(StatoFattura.CARICATO));
		//System.out.println(dbFattura.findBystatofattura(StatoFattura.IN_GESTIONE));
		
		//System.out.println(dbFattura.findByCliente((long) 1)); 
		//System.out.println(dbFattura.findByRangeDiImporti(1, 300000)); 
	}

	private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(ERole.ROLE_ADMIN);
		roleRepository.save(admin);

		Role user = new Role();
		user.setRoleName(ERole.ROLE_USER);
		roleRepository.save(user);

		Role moderator = new Role();
		moderator.setRoleName(ERole.ROLE_MODERATOR);
		roleRepository.save(moderator);

//		adminRole = new HashSet<Role>();
//		adminRole.add(admin);
//		adminRole.add(moderator);
//		adminRole.add(user);
//		
//		moderatorRole = new HashSet<Role>();
//		moderatorRole.add(moderator);
//		moderatorRole.add(user);
//		
//		userRole = new HashSet<Role>();
//		userRole.add(user);
	}

	private void saveProvinceDb() throws IllegalStateException, IOException {
		List<Provincia> listaProvince = new CsvToBeanBuilder<Provincia>(
				new FileReader("../epicode.energy.service/src/main/resources/csv/province-italiane.csv"))
				.withSeparator(';').withType(Provincia.class).build().parse();
		for (int i = 1; i < listaProvince.size(); i++) {
			provService.save(listaProvince.get(i));
			//System.out.println(listaProvince.get(i));
		}
	}

	private void saveComuniDb() throws IllegalStateException, IOException {
		List<ComuneDTOcsv> listaComuniDTO = new CsvToBeanBuilder<ComuneDTOcsv>(
				new FileReader("../epicode.energy.service/src/main/resources/csv/comuni-italiani2.csv"))
				.withSeparator(';').withType(ComuneDTOcsv.class).build().parse();

		for (int i = 1; i < listaComuniDTO.size(); i++) {

			Comune comune = new Comune();
			comune.setNome(listaComuniDTO.get(i).getNome());
			comune.setProvincia(provService.FindByName(listaComuniDTO.get(i).getProvincia()));
			comuneService.add(comune);
			//System.out.println(comune);
		}
	}

	public void Creaclienti(int clienticrea) {
		for (int i = 0; i < clienticrea; i++) {
			cliservice.Creafake();
		}
	}

	public void creaFattura(int numFatture) {
		for (int i = 0; i < numFatture; i++) {
			dbFattura.createFakeFattura();
		}
	}
	
public void createadmin() {
	RegisterDto admin = new RegisterDto();
	Set<String> ruolo=new HashSet<String>();
	ruolo.add("ADMIN");
	admin.setEmail("admin@gmail.com");
	admin.setLastName("admin");
	admin.setName("admin");
	admin.setPassword("admin");
	admin.setRoles(ruolo);
	admin.setUsername("admin");
	auth.register(admin);
}
}
