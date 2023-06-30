package com.itss.gym_master.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "MembershipActivityLogs")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class MembershipActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(0) //Register
    @Max(1) //Renew
    private Integer type;

    @Min(1)
    private Long periodOfMonths;

    private String note;

    @ManyToOne
    @JoinColumn(name = "loggedBy", referencedColumnName = "id")
    private Staff loggedBy;

    @ManyToOne
    @JoinColumn(name = "memberMembershipId", referencedColumnName = "id")
    private MemberMembership memberMembership;

    @OneToOne
    @JoinColumn(name = "paymentId", referencedColumnName = "id")
    private Payment payment;
}
