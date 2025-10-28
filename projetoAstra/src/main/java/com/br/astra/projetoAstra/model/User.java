package com.br.astra.projetoAstra.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private long id;

    @NotEmpty
    @Getter @Setter
    private String username;

    @NotEmpty
    @Getter @Setter
    private String email;

    @NotEmpty
    @Getter @Setter
    private String password;

}
