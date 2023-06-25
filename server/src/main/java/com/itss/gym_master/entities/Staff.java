package com.itss.gym_master.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

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
    @NotEmpty(message = "Position is mandatory")
    private Integer role;
    private String note;
    @NotEmpty(message = "Hired date is mandatory")
    private Date hiredDate;
    @NotEmpty(message = "Employment status is mandatory")
    private Integer employmentStatus;
    @NotEmpty(message = "Salary is mandatory")
    private Long salary;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL)
    private Set<Membership> memberships;

    @OneToMany(mappedBy = "loggedBy", cascade = CascadeType.DETACH)
    private Set<MembershipActivityLog> membershipActivityLogs;

    @OneToMany(mappedBy = "staff", cascade = CascadeType.DETACH)
    private Set<Reply> replies;
}
