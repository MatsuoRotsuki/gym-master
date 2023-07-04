package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @JsonIgnoreProperties(value = {"member", "membership", "membershipActivityLogs", "usageLogs"}, allowSetters = true)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "memberMembershipId", referencedColumnName = "id")
    private MemberMembership memberMembership;

    @JsonIgnoreProperties(value = {"membershipActivityLog"}, allowSetters = true)
    @OneToOne()
    @JoinColumn(name = "paymentId", referencedColumnName = "id")
    private Payment payment;
}
