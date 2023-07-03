package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Gyms")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Gym {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @NotEmpty(message = "Name is mandatory")
    private String name;
    @NotEmpty(message = "Address is mandatory")
    private String address;
    private String hotline;
    @Email(message = "Email must be valid email")
    private String email;
    @OneToMany(mappedBy = "gym", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("gym")
    private Set<Feedback> feedbacks = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "GymEquipments",
        joinColumns = @JoinColumn(name = "gymId", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "equipmentId", referencedColumnName = "id")
    )
    @JsonIgnoreProperties("gyms")
    private Set<Equipment> equipments = new HashSet<>();
}
