package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.HashSet;
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

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate joinedDate = LocalDate.now();

    @NotEmpty(message = "First name is mandatory")
    private String firstName;

    @NotEmpty(message = "First name is mandatory")
    private String lastName;

    @Min(value = 0, message = "Gender enum not approved")
    @Max(value = 1, message = "Gender enum not approved")
    private Integer gender;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    private String address;

    @NotEmpty(message = "Phone number is mandatory")
    private String phoneNumber;

    private String avatar;

    @DecimalMin("0.0")
    @DecimalMax("200.0")
    private Double weight;

    private String healthCondition;

    private Boolean isBanned = false;

    private String bannedReason;

    private String note;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonBackReference(value = "manageMember")
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<MemberMembership> memberMemberships = new HashSet<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private Set<Feedback> feedbacks = new HashSet<>();
}
