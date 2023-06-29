package com.itss.gym_master.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.sql.Date;

@Entity
@Table(name = "UsageLogs")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class UsageLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Logged datetime is mandatory")
    private Date date;

    private String note;

    @ManyToOne
    @JoinColumn(name = "memberMembershipId", referencedColumnName = "id")
    private MemberMembership memberMembership;

    @ManyToOne
    @JoinColumn(name = "loggedBy", referencedColumnName = "id")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "gymId", referencedColumnName = "id")
    private Gym gym;
}
