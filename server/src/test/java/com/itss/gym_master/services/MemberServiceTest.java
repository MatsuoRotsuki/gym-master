package com.itss.gym_master.services;

import com.itss.gym_master.entities.*;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.*;
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

class MemberServiceTest {
    private Member member;
    private MemberService memberService;
    private MemberRepository memberRepository;
    private UserRepository userRepository;
    private GymRepository gymRepository;
    private FeedbackRepository feedbackRepository;
    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this); // Initialize mocks

        memberRepository = Mockito.mock(MemberRepository.class);
        userRepository = Mockito.mock(UserRepository.class);

        feedbackRepository = Mockito.mock(FeedbackRepository.class);
        gymRepository = Mockito.mock(GymRepository.class);

        memberService = new MemberService(memberRepository, gymRepository, feedbackRepository, userRepository);
        //Test if have member

    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getAllMembers() {
    }

    @Test
    void newMember() {
        Member member = new Member();
        User user = new User();
        user.setRole(3);
        member.setUser(user);

        // Mock the behavior of the userRepository.save() and staffRepository.save() methods
        when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        when(memberRepository.save(Mockito.any(Member.class))).thenReturn(member);

        // Call the newStaff() function
        Member result = memberService.newMember(member);

        // Verify the behavior and assertions
        Mockito.verify(userRepository).save(user);
        Mockito.verify(memberRepository).save(member);
        Assertions.assertEquals(member, result);
        Assertions.assertEquals(3,user.getRole());
    }

    @Test
    void getOneMember_Success() {
        Long memberId = 1L;
        Member expectedMember = new Member(); // Create an instance of Staff with test data

        // Mock the behavior of the staffRepository
        when(memberRepository.findById(memberId)).thenReturn(Optional.of(expectedMember));
        // Call the method under test
        Optional<Member> result = memberService.getOneMember(memberId);
        assertEquals(expectedMember, result.get());
        // Verify the result
        assertTrue(result.isPresent());
        assertEquals(expectedMember, result.get());
    }

    @Test
    void getOneMember_MemberNotFound(){
        Long memberId = 1L;
        when(memberRepository.findById(memberId)).thenReturn(Optional.empty());
        Optional<Member> emptyResult = memberService.getOneMember(memberId);
        assertFalse(emptyResult.isPresent());
    }

    @Test
    void editMember_Success() {
        //create existing staff
        Long memberId = 1L;
        Member existingMember = new Member();
        existingMember.setId(memberId);
        User existingUser = new User();
        existingMember.setUser(existingUser);

        // create new staff
        Member newMember = new Member();
        newMember.setId(memberId);
        newMember.setJoinedDate(LocalDate.now());
        newMember.setWeight(78.0);
        newMember.setHealthCondition("Good");
        newMember.setIsBanned(Boolean.TRUE);
        newMember.setBannedReason("Dong tien muon");
        newMember.setNote("khong ");
        newMember.setFirstName("bryan");
        newMember.setLastName("Trump");
        newMember.setAddress("Hoang Mai, Ha Noi");
        newMember.setAvatar("");
        newMember.setDateOfBirth(LocalDate.now());
        newMember.setPhoneNumber("0123456789");
        newMember.setGender(1);

        // create new user
        User newUser = new User();
        newUser.setRole(3);

        newMember.setUser(newUser);

        Mockito.when(memberRepository.findById(memberId)).thenReturn(Optional.of(existingMember));
        Mockito.when(userRepository.findById(existingMember.getUser().getId())).thenReturn(Optional.of(existingMember.getUser()));

        Mockito.when(memberRepository.save(existingMember)).thenReturn(existingMember);
        Mockito.when(userRepository.save(existingMember.getUser())).thenReturn(existingMember.getUser());

        Member updatedMember = memberService.editMember(memberId, newMember);

        //Assertions.assertEquals(newStaff,updatedStaff);
        Assertions.assertEquals(newMember.getJoinedDate(), updatedMember.getJoinedDate());
        Assertions.assertEquals(newMember.getNote(), updatedMember.getNote());
        Assertions.assertEquals(newMember.getWeight(), updatedMember.getWeight());
        Assertions.assertEquals(newMember.getHealthCondition(), updatedMember.getHealthCondition());
        Assertions.assertEquals(newMember.getDateOfBirth(), updatedMember.getDateOfBirth());
        Assertions.assertEquals(newMember.getAddress(), updatedMember.getAddress());
        Assertions.assertEquals(newMember.getPhoneNumber(), updatedMember.getPhoneNumber());

        Assertions.assertEquals(newUser.getPasswordDigest(), updatedMember.getUser().getPasswordDigest());
    }

    @Test
    void editMember_MemberNotFound(){
        Long memberId = 1L;
        Member newMember = new Member();

        Mockito.when(memberRepository.findById(memberId)).thenReturn(Optional.empty());

        Assertions.assertThrows(EntityNotFoundException.class, () -> {
            memberService.editMember(memberId, newMember);
        });
    }
    @Test
    void removeMember_MemberExists() {
        Long memberId = 1L;
        Member member = new Member();
        User user = new User();
        member.setUser(user);
        // Mocking behavior of staffRepository.findById
        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));
        Optional<Member> result = memberService.removeMember(memberId);
        // Verify that the result contains the staff object
        assertTrue(result.isPresent());
        assertEquals(member, result.get());
    }

    @Test
    void removeMember_MemberNotExists(){
        Long memberId = 1L;
        when(memberRepository.findById(memberId)).thenReturn(Optional.empty());
        Optional<Member> result = memberService.removeMember(memberId);
        assertFalse(result.isPresent());
    }

    @Test
    void createFeedback_Success() {
        Long memberId = 1L;
        Long gymId = 2L;
        Long feedbackId = 3L;
        Member member = new Member();
        Gym gym = new Gym();
        Feedback feedback = new Feedback();

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));
        when(gymRepository.findById(gymId)).thenReturn(Optional.of(gym));
        when(feedbackRepository.save(feedback)).thenReturn(feedback);
        Feedback result = memberService.createFeedback(memberId, gymId, feedback);
        Assertions.assertEquals(member, result.getMember());
        Assertions.assertEquals(gym,result.getGym());
        Assertions.assertEquals(feedback,result);

    }

    @Test
    void banMember_Success() {
        Long memberId = 1L;
        Member member = new Member();
        member.setId(memberId);

        String banReason = "Khong dong tien";

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));
        Member result = memberService.banMember(memberId,banReason);

        Assertions.assertEquals(member,result);
        Assertions.assertEquals(banReason,result.getBannedReason());

    }

    @Test
    void unbanMember_Success() {
        Long memberId = 1L;
        Member member = new Member();
        member.setId(memberId);
        member.setIsBanned(true);

        when(memberRepository.findById(memberId)).thenReturn(Optional.of(member));
        Member result = memberService.unbanMember(memberId);

        Assertions.assertEquals(member,result);
        Assertions.assertFalse(result.getIsBanned());
    }
}