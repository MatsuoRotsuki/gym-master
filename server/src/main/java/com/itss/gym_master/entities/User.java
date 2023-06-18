package com.itss.gym_master.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

@Entity
@Table
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Email(message = "Email must be valid email")
    private String email;
    @NotEmpty(message = "Password is mandatory")
    @Length(min = 6)
    private String passwordDigest;
    @NotEmpty(message = "Gender is mandatory")
    private Integer gender;
    @NotEmpty(message = "Date of Birth is mandatory")
    private LocalDate dateOfBirth;
    private String address;
    @NotEmpty(message = "Phone number is mandatory")
    private String phoneNumber;
    @NotEmpty(message = "Role is not defined")
    private Integer role;

    public User() {
    }

    public User(String email, String passwordDigest, Integer gender, LocalDate dateOfBirth, String address, String phoneNumber, Integer role) {
        this.email = email;
        this.passwordDigest = passwordDigest;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.role = role;
    }
}
