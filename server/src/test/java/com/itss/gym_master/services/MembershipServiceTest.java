package com.itss.gym_master.services;

import com.itss.gym_master.entities.Membership;
import com.itss.gym_master.entities.Staff;
import com.itss.gym_master.repositories.MembershipRepository;
import com.itss.gym_master.repositories.StaffRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

class MembershipServiceTest {

    private MembershipRepository membershipRepository;
    private StaffRepository staffRepository;
    private MembershipService membershipService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        staffRepository = Mockito.mock(StaffRepository.class);
        membershipRepository = Mockito.mock(MembershipRepository.class);
        membershipService = new MembershipService(membershipRepository, staffRepository);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getAllMemberships() {
    }

    @Test
    void newMembership() {
        Long staffId = 1L;
        Staff newStaff = new Staff();
        newStaff.setId(staffId);

        Membership newMembership = new Membership();
        newMembership.setId(1L);
        newMembership.setCreatedBy(newStaff);
        newMembership.setName("new membership");
        newMembership.setDescription("new description");
        newMembership.setMonthlyPrice(4000L);
        newMembership.setMaxNumOfMembers(30);

        Mockito.when(membershipRepository.findById(newMembership.getId())).thenReturn(Optional.of(newMembership));
        Mockito.when(membershipRepository.save(newMembership)).thenReturn(newMembership);
        Mockito.when(staffRepository.findById(staffId)).thenReturn(Optional.of(newStaff));
        Mockito.when(staffRepository.save(newStaff)).thenReturn(newStaff);

        Membership result = membershipService.newMembership(newMembership, staffId);

        Assertions.assertEquals(newMembership, result);

    }

    @Test
    void getOneMembership() {
    }

    @Test
    void editMembership() {
    }

    @Test
    void removeMembership() {
    }
}