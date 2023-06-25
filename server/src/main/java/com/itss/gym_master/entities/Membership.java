package com.itss.gym_master.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

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
    @NotEmpty(message = "Monthly price is mandatory")
    private Long monthlyPrice;
    private String description;
    @NotEmpty(message = "Max number of members is mandatory")
    private Integer maxNumOfMembers;

    @ManyToOne
    @JoinColumn(name = "createdBy", referencedColumnName = "id")
    private Staff createdBy;

    @OneToMany(mappedBy = "membership", cascade = CascadeType.ALL)
    private Set<MemberMembership> registrations;
}
