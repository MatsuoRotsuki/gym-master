package com.itss.gym_master.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

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
    @NotEmpty(message = "Rating is mandatory")
    @Min(1)
    @Max(5)
    private int stars;
    @ManyToOne()
    @JoinColumn(name = "memberId", referencedColumnName = "id")
    private Member member;

    @ManyToOne()
    @JoinColumn(name = "gymId")
    private Gym gym;

    @OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL)
    private Set<Reply> replies;
}
