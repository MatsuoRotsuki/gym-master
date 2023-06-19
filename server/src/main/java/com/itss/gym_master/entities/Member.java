package com.itss.gym_master.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "members")
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate joinedDate;
    
    private Double weight;

    private String healthCondition;

    private Boolean isBanned;

    private String bannedReason;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    private String note;

    public Member() {
    }

    public Member(LocalDate joinedDate, Double weight, String healthCondition, String note) {
        this.joinedDate = joinedDate;
        this.weight = weight;
        this.healthCondition = healthCondition;
        this.note = note;
    }
}
