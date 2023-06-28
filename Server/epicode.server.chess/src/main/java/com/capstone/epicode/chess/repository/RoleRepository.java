package com.capstone.epicode.chess.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.epicode.chess.entity.ERole;
import com.capstone.epicode.chess.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByRoleName(ERole roleName);

}
