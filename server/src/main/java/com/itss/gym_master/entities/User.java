package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "Users")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@JsonIgnoreProperties(value = {"role"}, allowGetters = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Email(message = "Email must be valid email")
    @NotEmpty(message = "Email is mandatory")
    private String email;

    @NotEmpty(message = "Password is mandatory")
    private String passwordDigest;

    private Integer role;

    @JsonIgnoreProperties({"user", "memberMemberships", "feedbacks"})
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "manageMember")
    private Member member;

    @JsonIgnoreProperties({"user", "memberMemberships", "feedbacks", "replies"})
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "manageStaff")
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