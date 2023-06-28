package com.capstone.epicode.chess.service;

import com.capstone.epicode.chess.payload.LoginDto;
import com.capstone.epicode.chess.payload.RegisterDto;

public interface AuthService {
    
	String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
    
}
