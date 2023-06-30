package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate validUntil;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate validFrom;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @JsonIgnoreProperties(value = {"memberMemberships"}, allowSetters = true)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "memberId", referencedColumnName = "id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "membershipId", referencedColumnName = "id")
    private Membership membership;

    @OneToMany(mappedBy = "memberMembership", cascade = CascadeType.DETACH)
    private Set<MembershipActivityLog> membershipActivityLogs;
}
