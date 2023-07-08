package com.itss.gym_master.services;

import com.itss.gym_master.entities.Feedback;
import com.itss.gym_master.entities.Reply;
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

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class StaffServiceTest {
    private StaffRepository staffRepository;
    private UserRepository userRepository;
    private FeedbackRepository feedbackRepository;
    private ReplyRepository replyRepository;
    private StaffService staffService;

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this); // Initialize mocks

        staffRepository = Mockito.mock(StaffRepository.class);
        userRepository = Mockito.mock(UserRepository.class);
        feedbackRepository = Mockito.mock(FeedbackRepository.class);
        staffRepository = Mockito.mock(StaffRepository.class);
        replyRepository = Mockito.mock(ReplyRepository.class);
        staffService = new StaffService(staffRepository, userRepository, feedbackRepository, replyRepository);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getAllStaffs() {
    }

    @Test
    void newStaff() {
        Staff staff = new Staff();
        User user = new User();
        user.setRole(2);
        staff.setUser(user);

        // Mock the behavior of the userRepository.save() and staffRepository.save() methods
        when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        when(staffRepository.save(Mockito.any(Staff.class))).thenReturn(staff);

        // Call the newStaff() function
        Staff result = staffService.newStaff(staff);

        // Verify the behavior and assertions
        Mockito.verify(userRepository).save(user);
        Mockito.verify(staffRepository).save(staff);
        Assertions.assertEquals(staff, result);
        Assertions.assertEquals(2, user.getRole());
    }

    @Test
    void getOneStaff_Success() {
        //Test if have staff
        Long staffId = 1L;
        Staff expectedStaff = new Staff(); // Create an instance of Staff with test data

        // Mock the behavior of the staffRepository
        when(staffRepository.findById(staffId)).thenReturn(Optional.of(expectedStaff));
        // Call the method under test
        Optional<Staff> result = staffService.getOneStaff(staffId);
        assertEquals(expectedStaff, result.get());
        // Verify the result
        assertTrue(result.isPresent());
        assertEquals(expectedStaff, result.get());

        // Test if have no staff
        when(staffRepository.findById(staffId)).thenReturn(Optional.empty());
        Optional<Staff> emptyResult = staffService.getOneStaff(staffId);
        assertFalse(emptyResult.isPresent());
    }

    @Test
    public void getOneStaff_StaffNotFound() {
        Long staffId = 1L;
        when(staffRepository.findById(staffId)).thenReturn(Optional.empty());
        Optional<Staff> emptyResult = staffService.getOneStaff(staffId);
        assertFalse(emptyResult.isPresent());
    }

    @Test
    public void editStaff_Success() {
        //create existing staff
        Long staffId = 1L;
        Staff existingStaff = new Staff();
        existingStaff.setId(staffId);
        User existingUser = new User();
        existingStaff.setUser(existingUser);

        // create new staff
        Staff newStaff = new Staff();
        newStaff.setId(staffId);
        newStaff.setPosition("New Position");
        newStaff.setNote("None");
        newStaff.setSalary(10000000L);
        newStaff.setEmploymentStatus(2);
        newStaff.setDateOfBirth(LocalDate.now());
        newStaff.setGender(1);
        newStaff.setAddress("Ha Noi, Viet nam");
        newStaff.setPhoneNumber("0345678912");
        //newStaff.setHiredDate();

        // create new user
        User newUser = new User();
        newUser.setPasswordDigest("1223456789@");

        newStaff.setUser(newUser);

        Mockito.when(staffRepository.findById(staffId)).thenReturn(Optional.of(existingStaff));
        Mockito.when(userRepository.findById(existingStaff.getUser().getId())).thenReturn(Optional.of(existingStaff.getUser()));

        Mockito.when(staffRepository.save(existingStaff)).thenReturn(existingStaff);
        Mockito.when(userRepository.save(existingStaff.getUser())).thenReturn(existingStaff.getUser());

        Staff updatedStaff = staffService.editStaff(staffId, newStaff);

        //Assertions.assertEquals(newStaff,updatedStaff);
        Assertions.assertEquals(newStaff.getPosition(), updatedStaff.getPosition());
        Assertions.assertEquals(newStaff.getNote(), updatedStaff.getNote());
        Assertions.assertEquals(newStaff.getSalary(), updatedStaff.getSalary());
        Assertions.assertEquals(newStaff.getEmploymentStatus(), updatedStaff.getEmploymentStatus());
        Assertions.assertEquals(newStaff.getDateOfBirth(), updatedStaff.getDateOfBirth());
        Assertions.assertEquals(newStaff.getAddress(), updatedStaff.getAddress());
        Assertions.assertEquals(newStaff.getPhoneNumber(), updatedStaff.getPhoneNumber());

        Assertions.assertEquals(newUser.getPasswordDigest(), updatedStaff.getUser().getPasswordDigest());
    }

    @Test
    public void editStaff_StaffNotFound() {
        Long staffId = 1L;
        Staff newStaff = new Staff();

        Mockito.when(staffRepository.findById(staffId)).thenReturn(Optional.empty());

        Assertions.assertThrows(EntityNotFoundException.class, () -> {
            staffService.editStaff(staffId, newStaff);
        });
    }

    @Test
    public void removeStaff_StaffExists() {
        Long staffId = 1L;
        Staff staff = new Staff();
        User user = new User();
        staff.setUser(user);
        // Mocking behavior of staffRepository.findById
        when(staffRepository.findById(staffId)).thenReturn(Optional.of(staff));
        Optional<Staff> result = staffService.removeStaff(staffId);
        // Verify that the result contains the staff object
        assertTrue(result.isPresent());
        assertEquals(staff, result.get());
    }

    @Test
    public void removeStaff_StaffNotFound() {
        Long staffId = 1L;
        when(staffRepository.findById(staffId)).thenReturn(Optional.empty());
        Optional<Staff> result = staffService.removeStaff(staffId);
        assertFalse(result.isPresent());
    }

    @Test
    public void replyFeedback_Success() {
        Long staffId = 1L;
        Long feedbackId = 2L;
        Staff staff = new Staff();
        Feedback feedback = new Feedback();
        Reply reply = new Reply();

        when(staffRepository.findById(staffId)).thenReturn(Optional.of(staff));
        when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.of(feedback));
        when(replyRepository.save(reply)).thenReturn(reply);

        Reply result = staffService.replyFeedback(staffId, feedbackId, reply);
        assertEquals(staff, reply.getStaff());
        assertEquals(feedback, reply.getFeedback());
        assertEquals(reply, result);
    }

    @Test
    public void replyFeedback_StaffNotFound() {
        Long staffId = 1L;
        Long feedbackId = 2L;
        Reply reply = new Reply();

        when(staffRepository.findById(staffId)).thenReturn(Optional.empty());
        when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.of(new Feedback()));

        Assertions.assertThrows(EntityNotFoundException.class, () -> {
            staffService.replyFeedback(staffId, feedbackId, reply);
        });

    }

    @Test
    public void replyFeedback_FeedbackNotFound() {
        Long staffId = 1L;
        Long feedbackId = 2L;
        Staff staff = new Staff();
        Reply reply = new Reply();

        // Mocking behavior of staffRepository.findById to return a staff object
        when(staffRepository.findById(staffId)).thenReturn(Optional.of(staff));
        // Mocking behavior of feedbackRepository.findById to return an empty Optional
        when(feedbackRepository.findById(feedbackId)).thenReturn(Optional.empty());

        Assertions.assertThrows(EntityNotFoundException.class, () -> {
            staffService.replyFeedback(staffId, feedbackId, reply);
        });
    }

    @Test
    public void editReply_Success() {
        Long staffId = 1L;
        Long replyId = 2L;
        Reply replyContent = new Reply();
        replyContent.setContent("Updated reply content");

        Staff staff = new Staff();
        Reply reply = new Reply();
        Mockito.when(staffRepository.findById(staffId)).thenReturn(Optional.of(staff));
        Mockito.when(replyRepository.findById(replyId)).thenReturn(Optional.of(reply));
        Mockito.when(replyRepository.save(reply)).thenReturn(reply);

        Reply updatedReply = staffService.editReply(staffId, replyId, replyContent);

        Mockito.verify(staffRepository).findById(staffId);
        Mockito.verify(replyRepository).findById(replyId);
        Mockito.verify(replyRepository).save(reply);

        Assertions.assertEquals(replyContent.getContent(), updatedReply.getContent());
        Assertions.assertEquals(staff, updatedReply.getStaff());
    }

    @Test
    public void editReply_ReplyNotFound() {
        Long staffId = 1L;
        Long replyId = 2L;
        Reply replyContent = new Reply();
        replyContent.setContent("Updated reply content");

        Staff staff = new Staff();
        Mockito.when(staffRepository.findById(staffId)).thenReturn(Optional.of(staff));
        Mockito.when(replyRepository.findById(replyId)).thenReturn(Optional.empty());

        Assertions.assertThrows(EntityNotFoundException.class, () -> {
            staffService.editReply(staffId, replyId, replyContent);
        });

        // Verify that the repository methods were called appropriately
        Mockito.verify(staffRepository).findById(staffId);
        Mockito.verify(replyRepository).findById(replyId);
        Mockito.verify(replyRepository, Mockito.never()).save(Mockito.any(Reply.class));
    }

}
