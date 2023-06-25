package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.Feedback;
import com.itss.gym_master.services.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/feedbacks")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping()
    ResponseEntity<List<Feedback>> all() {
        return ResponseEntity.ok().body(feedbackService.getAllFeedbacks());
    }

    @GetMapping("/{id}")
    ResponseEntity<Feedback> one(@PathVariable Long id) {
        return ResponseEntity.ok().body(feedbackService.getAFeedback(id));
    }

    @PutMapping(value = "/{id}", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Feedback> update(@PathVariable Long id, @RequestBody @Valid Feedback feedback) {
        return ResponseEntity.ok().body(feedbackService.updateFeedback(id, feedback));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Feedback> delete(@PathVariable Long id) {
        return ResponseEntity.ok().body(feedbackService.removeFeedback(id));
    }
}
