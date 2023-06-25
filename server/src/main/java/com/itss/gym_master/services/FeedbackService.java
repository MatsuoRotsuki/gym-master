package com.itss.gym_master.services;

import com.itss.gym_master.entities.Feedback;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Feedback getAFeedback(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found feedback with id: " + id));
    }

    public Feedback updateFeedback(Long id, Feedback feedback) {
        return feedbackRepository.findById(id).map(tFeedback -> {
            tFeedback.setContent(feedback.getContent());
            tFeedback.setStars(feedback.getStars());
            return feedbackRepository.save(tFeedback);
        }).orElseThrow(() -> new EntityNotFoundException("Could not found feedback with id: " + id));
    }

    public Feedback removeFeedback(Long id) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found feedback with id " + id));
        feedbackRepository.deleteById(id);
        return feedback;
    }
}
