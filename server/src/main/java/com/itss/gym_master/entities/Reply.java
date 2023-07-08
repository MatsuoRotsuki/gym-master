package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "Replies")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Content of reply id mandatory")
    private String content;

    @ManyToOne
    @JoinColumn(name = "postedBy", referencedColumnName = "id")
    @JsonIgnoreProperties({"replies", "memberships", "membershipActivityLogs"})
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "feedbackId", referencedColumnName = "id")
    @JsonIgnoreProperties({"replies", "gym"})
    private Feedback feedback;
}
