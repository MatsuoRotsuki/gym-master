package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "Staffs")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String position;

    private String note;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date hiredDate;

    @Min(1)
    @Max(3)
    private Integer employmentStatus;

    @Min(1000000)
    private Long salary;

    @OneToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = {"staff", "member"}, allowSetters = true)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    private Set<Membership> memberships;

    @OneToMany(mappedBy = "loggedBy", cascade = CascadeType.DETACH)
    private Set<MembershipActivityLog> membershipActivityLogs;

    @OneToMany(mappedBy = "staff", cascade = CascadeType.DETACH)
    private Set<Reply> replies;
}
