package com.itss.gym_master.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "Members")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
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

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private Set<Feedback> feedbacks;
}
