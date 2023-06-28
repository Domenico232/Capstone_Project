package com.capstone.epicode.chess.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginDto {
    private String username;
    private String password;
}

//Il client dovrà inviare un oggetto JSON nel body con questa forma
/*{
    "username": "francescaneri",
    "password": "qwerty"
}*/
