package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Memberships")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Name is mandatory")
    private String name;

    @Min(100000)
    private Long monthlyPrice;

    private String description;

    @Min(0)
    @Max(50)
    private Integer maxNumOfMembers;

    @JsonIgnoreProperties(value = {"createdMemberships", "loggedPayments", "replies", "loggedUsageLogs"}, allowSetters = true)
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "createdBy", referencedColumnName = "id", nullable = false)
    private Staff createdBy;

    @JsonIgnoreProperties(value = {"membership"}, allowSetters = true)
    @OneToMany(mappedBy = "membership", cascade = CascadeType.ALL)
    private Set<MemberMembership> registrations = new HashSet<>();
}
