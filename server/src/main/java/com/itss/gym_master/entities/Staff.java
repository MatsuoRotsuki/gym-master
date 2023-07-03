package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.HashSet;
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
    private LocalDate hiredDate;

    @Min(1)
    @Max(3)
    private Integer employmentStatus;

    @Min(1000000)
    private Long salary;

    @OneToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    @JsonIgnoreProperties(value = {"staff"}, allowSetters = true)
    @OneToMany(mappedBy = "staff", cascade = CascadeType.DETACH)
    private Set<Reply> replies = new HashSet<>();
}
