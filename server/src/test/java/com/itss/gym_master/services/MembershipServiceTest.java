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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

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

        Membership result = membershipService.newMembership(newMembership,staffId);

        Assertions.assertEquals(newMembership,result);

    }

    @Test
    void getOneMembership_MembershipExists() {
        //Test if have staff
        Long staffId = 1L;
        Staff staff = new Staff();
        staff.setId(staffId);

        Long membershipId = 1L;
        Membership expectedMembership = new Membership();
        expectedMembership.setId(membershipId);
        expectedMembership.setId(1L);
        expectedMembership.setCreatedBy(staff);
        expectedMembership.setName("new membership");
        expectedMembership.setDescription("new description");
        expectedMembership.setMonthlyPrice(4000L);
        expectedMembership.setMaxNumOfMembers(30);

        when(membershipRepository.findById(membershipId)).thenReturn(Optional.of(expectedMembership));
        Optional<Membership> result = membershipService.getOneMembership(membershipId);
        assertTrue(result.isPresent());
        System.out.println(result.get());
        assertEquals(expectedMembership, result.get());
    }

    @Test
    void getOneMembership_MembershipNotExists() {
        Long membershipId = 1L;
        when(membershipRepository.findById(membershipId)).thenReturn(Optional.empty());
        Optional<Membership> emptyResult = membershipService.getOneMembership(membershipId);
        assertFalse(emptyResult.isPresent());
    }
    @Test
    void editMembership_MembershipExists() {
        Long membershipId = 1L;
        Membership existingMembership = new Membership();
        existingMembership.setId(membershipId);

        Membership newMembership = new Membership();
        newMembership.setId(membershipId);
        newMembership.setName("new name");
        newMembership.setDescription("new description");
        newMembership.setMonthlyPrice(70L);

        Mockito.when(membershipRepository.findById(membershipId)).thenReturn(Optional.of(newMembership));
        Mockito.when(membershipRepository.save(newMembership)).thenReturn(newMembership);

        Membership result = membershipService.editMembership(membershipId, newMembership);

        Assertions.assertEquals(newMembership, result);

    }
//    @Test
//    void removeMembership() {
//    }
}