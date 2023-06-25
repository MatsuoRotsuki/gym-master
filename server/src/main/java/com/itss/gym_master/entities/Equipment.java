package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Equipments")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Name is mandatory")
    private String name;

    @NotEmpty(message = "Type is mandatory")
    private String type;

    @NotEmpty(message = "Manufacturer is mandatory")
    private String manufacturer;

    private String description;

    @ManyToMany(mappedBy = "equipments", fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<Gym> gyms = new HashSet<>();

    // @Override
    // public boolean equals(Object equipment) {
    //     if (equipment instanceof Equipment) {
    //         Equipment e = (Equipment) equipment;
    //         return e.id == this.getId();
    //     }
    //     return false;
    // }
}
