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
import java.util.HashSet;
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
    private LocalDate validUntil;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate validFrom;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(nullable = false)
    private LocalDateTime createdAt;

    private Boolean hasActivated = false;

    @JsonIgnoreProperties(value = {"memberMemberships" , "feedbacks"}, allowSetters = true)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "memberId", referencedColumnName = "id")
    private Member member;

    @JsonIgnoreProperties(value = {"registrations", "createdBy"}, allowSetters = true)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "membershipId", referencedColumnName = "id")
    private Membership membership;

    @JsonIgnoreProperties(value = {"memberMembership", "payment"}, allowSetters = true)
    @OneToMany(mappedBy = "memberMembership", cascade = CascadeType.ALL)
    private Set<MembershipActivityLog> membershipActivityLogs = new HashSet<>();

    @JsonIgnoreProperties(value = {"memberMembership", "loggedStaff", "gym"}, allowSetters = true)
    @OneToMany(mappedBy = "memberMembership", cascade = CascadeType.ALL)
    private Set<UsageLog> usageLogs = new HashSet<>();
}
