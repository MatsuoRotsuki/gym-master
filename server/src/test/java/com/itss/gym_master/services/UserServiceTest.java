package com.itss.gym_master.services;

import com.itss.gym_master.entities.User;
import com.itss.gym_master.repositories.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(MockitoJUnitRunner.class)
class UserServiceTest {

    private UserService userService;
    private UserRepository userRepository;
    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this); // Initialize mocks

        userRepository = Mockito.mock(UserRepository.class);
        userService = new UserService(userRepository);
    }

    @AfterEach
    void tearDown() {
    }

    @ParameterizedTest
    @CsvSource({
            "1,nam@gmail.com,123456789,1,2000-11-11,Ha Noi,1234567890,2",
            "2,luong@gmail.com,12,0,1999-10-19,Nam Dinh,0123456789,1",
            // Add more CSV lines for additional test cases
    })

    @Test
    void getAllUsers() {

    }

    @Test
    void newUser() {

    }

    @Test
    void getOneUser() {
    }

    @Test
    void editUser() {
//        Long id = 1L;
//        User existingUser = new User();
//        existingUser.setId(id);
//        existingUser.setEmail("existing@example.com");
//        existingUser.setGender(0);
//        existingUser.setPasswordDigest("existingPassword");
//        existingUser.setRole(1);
//        existingUser.setDateOfBirth(LocalDate.of(1990, 1, 1));
//
//        User newUser = new User();
//        newUser.setEmail("new@example.com");
//        newUser.setGender(1);
//        newUser.setPasswordDigest("newPassword");
//        newUser.setRole(2);
//        newUser.setDateOfBirth(LocalDate.of(1995, 2, 2));
//
//        User updatedUser = userService.editUser(id, newUser);
//
//        verify(userRepository, times(1)).findById(id);
//        verify(userRepository, times(1)).save(any(User.class));
//
//        assertEquals(id, updatedUser.getId());
//        assertEquals(newUser.getEmail(), updatedUser.getEmail());
//        assertEquals(newUser.getGender(), updatedUser.getGender());
//        assertEquals(newUser.getPasswordDigest(), updatedUser.getPasswordDigest());
//        assertEquals(newUser.getRole(), updatedUser.getRole());
//        assertEquals(newUser.getDateOfBirth(), updatedUser.getDateOfBirth());
    }

    @Test
    void removeUser() {
    }
}