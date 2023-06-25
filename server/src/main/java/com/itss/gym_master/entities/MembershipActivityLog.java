package com.itss.gym_master.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
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

    @NotEmpty(message = "Type of registration is mandatory")
    private Integer type;

    // CÁI NÀY CHƯA BIẾT NHƯ THẾ NÀO?
    @NotEmpty(message = "Perios is mandatory")
    private String period;

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
