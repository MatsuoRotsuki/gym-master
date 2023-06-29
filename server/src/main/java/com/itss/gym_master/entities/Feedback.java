package com.itss.gym_master.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Feedbacks")
@Setter
@Getter
@AllArgsConstructor
@ToString
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @NotEmpty(message = "Content is mandatory")
    private String content;
    @NotNull(message = "Rating is mandatory")
    @Min(1)
    @Max(5)
    private Integer stars;
    @ManyToOne()
    @JoinColumn(name = "memberId", referencedColumnName = "id")
    @JsonIgnore
    private Member member;

    @ManyToOne()
    @JoinColumn(name = "gymId")
    @JsonIgnore
    private Gym gym;

    @OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL)
    private Set<Reply> replies = new HashSet<>();
}
