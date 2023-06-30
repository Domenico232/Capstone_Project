package com.capstone.epicode.chess.runner;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.capstone.epicode.chess.entity.ERole;
import com.capstone.epicode.chess.entity.Role;
import com.capstone.epicode.chess.entity.User;
import com.capstone.epicode.chess.model.Chessboard;
import com.capstone.epicode.chess.payload.RegisterDto;
import com.capstone.epicode.chess.repository.RoleRepository;
import com.capstone.epicode.chess.repository.UserRepository;
import com.capstone.epicode.chess.service.AuthService;
import com.capstone.epicode.chess.service.AuthServiceImpl;
import com.capstone.epicode.chess.service.ChessboardService;

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
	ChessboardService cs;
	private Set<Role> adminRole;
	private Set<Role> moderatorRole;
	private Set<Role> userRole;

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		// Metodo da lanciare solo la prima volta
		// Serve per salvare i ruoli nel DB
		setRoleDefault();

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
	admin.setNationality("Italiana");
	auth.register(admin);
	
	RegisterDto player = new RegisterDto();
	Set<String> role=new HashSet<String>();
	ruolo.add("USER");
	player.setEmail("player@gmail.com");
	player.setLastName("player");
	player.setName("player");
	player.setPassword("player");
	player.setRoles(role);
	player.setUsername("player");
	player.setNationality("Italiana");
	auth.register(player);
	
	User user1 = userRepository.findById(1);
	User user2 = userRepository.findById(2);
	System.out.println(user1);
	Chessboard chessBoard = new Chessboard();
	chessBoard.setPrimo(user1);
	chessBoard.setSecondo(user2);
	chessBoard.setMovecol(2);
	chessBoard.setMoverow(1);
	chessBoard.setPiececol(1);
	chessBoard.setPiecerow(1);
	cs.addBoard(chessBoard);
	
}


}
