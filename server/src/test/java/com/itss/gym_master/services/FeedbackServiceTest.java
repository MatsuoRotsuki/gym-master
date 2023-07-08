package com.itss.gym_master.services;

import com.itss.gym_master.entities.Equipment;
import com.itss.gym_master.entities.Feedback;
import com.itss.gym_master.entities.Staff;
import com.itss.gym_master.entities.User;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.FeedbackRepository;
import com.itss.gym_master.repositories.ReplyRepository;
import com.itss.gym_master.repositories.StaffRepository;
import com.itss.gym_master.repositories.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class FeedbackServiceTest {
    private FeedbackRepository feedbackRepository;
    private FeedbackService feedbackService;
    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this); // Initialize mocks
        feedbackRepository = Mockito.mock(FeedbackRepository.class);
        feedbackService = new FeedbackService(feedbackRepository);
    }
    @AfterEach
    void tearDown() {
    }
    @Test
    void getAllFeedbacks() {
    }

    @Test
    void getAFeedback_FeedbackExists() {
        //Test if have staff
        Long feedbackId = 1L;
        Feedback expectedFeedback = new Feedback();
        expectedFeedback.setId(feedbackId);
        expectedFeedback.setContent("New Feedback");

        when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.of(expectedFeedback));
        Optional<Feedback> result = Optional.ofNullable(feedbackService.getAFeedback(feedbackId));
        assertTrue(result.isPresent());
        System.out.println(result.get());
        assertEquals(expectedFeedback, result.get());
    }

//    @Test
//    void getAFeedback_FeedbackNotExists() {
//        Long feedbackId = 1L;
//        when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.empty());
//        Optional<Feedback> emptyResult = feedbackService.getAFeedback(feedbackId);
//
//        assertFalse(emptyResult.isPresent());
//    }
    @Test
    void updateFeedback_FeedbackExists() {
        Long feedbackId = 1L;
        Feedback existingFeedback = new Feedback();
        existingFeedback.setId(feedbackId);

        Mockito.when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.of(existingFeedback));
        Mockito.when(feedbackRepository.save(existingFeedback)).thenReturn(existingFeedback);

        Feedback newFeedback = new Feedback();
        newFeedback.setContent("New feedback");
        newFeedback.setStars(5);

        Feedback result = feedbackService.updateFeedback(feedbackId,newFeedback);

        Assertions.assertEquals(feedbackId, result.getId());
        Assertions.assertEquals(newFeedback.getContent(),result.getContent());
        Assertions.assertEquals(newFeedback.getStars(), result.getStars());
    }

    @Test
    void updateFeedback_FeedbackNotExists() {
        Long feedbackId = 1L;
        Feedback feedback = new Feedback();

        Mockito.when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> {
           feedbackService.updateFeedback(feedbackId, feedback);
        });
    }

    @Test
    void removeFeedback_FeedbackExists() {
        Long feedbackId = 1L;
        Feedback feedback = new Feedback();
        feedback.setId(feedbackId);
        feedback.setContent("this is feedback");
        feedback.setStars(4);
        // Mocking behavior of staffRepository.findById
        when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.of(feedback));
        Optional<Feedback> result = Optional.ofNullable(feedbackService.removeFeedback(feedbackId));
        // Verify that the result contains the staff object
        assertTrue(result.isPresent());
        assertEquals(feedback, result.get());
    }

    @Test
    void removeFeedback_FeedbackNotExists() {
        Feedback feedback = new Feedback();
        // Creating a new Equipment object
        feedback.setContent("This is y feeback");
        feedback.setStars(5);

        // Mocking the repository to return an empty Optional
        when(feedbackRepository.findById(feedback.getId())).thenReturn(Optional.empty());

        // Calling the editEquipment() method and expecting an EntityNotFoundException
        assertThrows(EntityNotFoundException.class, () -> {
            feedbackService.removeFeedback(feedback.getId());
        });

    }
}