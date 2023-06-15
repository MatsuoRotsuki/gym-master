package com.itss.gym_master.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Gym {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Name is mandatory")
    private String name;
    @NotEmpty(message = "Address is mandatory")
    private String address;
    private String hotline;
    @Email(message = "Email must be valid email")
    private String email;

    public Gym() {}

    public Gym(String name, String address, String hotline, String email) {
        this.name = name;
        this.address = address;
        this.hotline = hotline;
        this.email = email;
    }
}
