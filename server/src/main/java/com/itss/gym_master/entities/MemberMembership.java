package com.itss.gym_master.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.sql.Date;
import java.util.Set;

@Table(name = "MemberMemberships")
@Entity
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class MemberMembership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "Valid until date is mandatory")
    private Date validUntil;
    @NotEmpty(message = "Valid from date is mandatory")
    private Date validFrom;

    @ManyToOne
    @JoinColumn(name = "memberId", referencedColumnName = "id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "membershipId", referencedColumnName = "id")
    private Membership membership;

    @OneToMany(mappedBy = "memberMembership", cascade = CascadeType.DETACH)
    private Set<MembershipActivityLog> membershipActivityLogs;
}
