package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.HashSet;
import java.util.Objects;
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

    @JsonIgnore
    @ManyToMany(mappedBy = "equipments", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({ "equipments", "feedbacks" })
    private Set<Gym> gyms = new HashSet<>();

    @Override
    public boolean equals(Object equipment) {
        if (equipment instanceof Equipment e) {
            return Objects.equals(e.id, this.getId());
        }
        return false;
    }
}
