package com.itss.gym_master.services;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
class UserServiceTest {


    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this); // Initialize mocks
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
    void removeUser() {
    }
}
