package com.capstone.epicode.chess.payload;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    private String name;
    private String lastName;
    private String username;
    private String email;
    private String password;
    // Passagio di ruoli dal client (Facoltativo)
    private Set<String> roles;
}

/*username
email
password
nome
cognome*/

// Il client dovrà inviare un oggetto JSON nel body con questa forma
/*{
    "name": "Francesca Neri",
    "username": "francescaneri",
    "email": "f.neri@example.com",
    "password": "qwerty",
    "roles": ["MODERATOR", "USER"]
}*/
