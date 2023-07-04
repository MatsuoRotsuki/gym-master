package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Table(name = "Users")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@JsonIgnoreProperties(value = { "role" }, allowGetters = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Email(message = "Email must be valid email")
    private String email;

    @NotEmpty(message = "Password is mandatory")
    private String passwordDigest;

    @NotEmpty(message = "First name is mandatory")
    private String firstName;

    @NotEmpty(message = "Last name is mandatory")
    private String lastName;

    @Min(value = 0, message = "Gender enum not approved")
    @Max(value = 1, message = "Gender enum not approved")
    private Integer gender;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    private String address;

    @NotEmpty(message = "Phone number is mandatory")
    @Length(min = 8, max = 10)
    private String phoneNumber;

    private Integer role;

    @JsonIgnoreProperties({ "user" })
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Member member;

    @JsonIgnoreProperties({ "user" })
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Staff staff;

    @JsonIgnore
    public String getPasswordDigest() {
        return passwordDigest;
    }

    @JsonProperty
    public void setPasswordDigest(String passwordDigest) {
        this.passwordDigest = passwordDigest;
    }
}
