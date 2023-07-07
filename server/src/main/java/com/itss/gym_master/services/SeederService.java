package com.itss.gym_master.services;

import com.github.javafaker.Faker;
import com.itss.gym_master.entities.*;
import com.itss.gym_master.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class SeederService {
    private final EquipmentRepository equipmentRepository;
    private final GymRepository gymRepository;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final StaffRepository staffRepository;
    private final MembershipRepository membershipRepository;
    private final FeedbackRepository feedbackRepository;
    private final MemberMembershipRepository memberMembershipRepository;

    public static final Faker faker = new Faker();
    public static final Random rand = new Random();

    @Autowired
    public SeederService(EquipmentRepository equipmentRepository,
            GymRepository gymRepository,
            UserRepository userRepository,
            MemberRepository memberRepository,
            StaffRepository staffRepository,
            MembershipRepository membershipRepository,
            FeedbackRepository feedbackRepository,
            MemberMembershipRepository memberMembershipRepository) {
        this.equipmentRepository = equipmentRepository;
        this.gymRepository = gymRepository;
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
        this.staffRepository = staffRepository;
        this.membershipRepository = membershipRepository;
        this.feedbackRepository = feedbackRepository;
        this.memberMembershipRepository = memberMembershipRepository;
    }

    public List<Gym> fakeGyms() {
        List<Gym> gyms = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            Gym gym = new Gym();
            gym.setName("Phòng gym số " + faker.random().nextInt(20));
            gym.setEmail(faker.internet().safeEmailAddress());
            gym.setHotline(faker.phoneNumber().phoneNumber());
            gym.setAddress(faker.address().streetAddress());
            for (int j = 0; j < 4; j++) {
                Equipment equipment = new Equipment();
                List<String> types = List.of("Tạ", "Máy chạy", "Máy tập chân");
                equipment.setType(types.get(new Random().nextInt(types.size())));
                equipment.setName(types.get(new Random().nextInt(types.size())) + " 2 cân");
                equipment.setDescription("giúp săn chắc, giảm mỡ cơ");
                equipment.setManufacturer("H&K");
                equipmentRepository.save(equipment);
                gym.getEquipments().add(equipment);
            }
            gyms.add(gymRepository.save(gym));
        }
        return gyms;
    }

    public List<Staff> fakeStaffs() {
        List<Staff> staffs = new ArrayList<>();

        for (int i = 0; i < 30; i++) {
            User user = new User();

            user.setEmail(faker.internet().emailAddress());
            user.setPasswordDigest(faker.internet().password());
            user.setRole(2);
            user = userRepository.save(user);

            Staff newStaff = new Staff();
            List<String> positions = List.of("Sales", "Trainer", "Receptionist");
            newStaff.setPosition(positions.get(new Random().nextInt(positions.size())));
            newStaff.setEmploymentStatus(faker.random().nextInt(1, 3));
            newStaff.setNote(faker.lorem().sentence());
            newStaff.setHiredDate(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            newStaff.setSalary(1000000L + faker.random().nextInt(0, 5000000));
            newStaff.setUser(user);
            newStaff.setFirstName(faker.name().firstName());
            newStaff.setLastName(faker.name().lastName());
            newStaff.setAddress(faker.address().fullAddress());
            newStaff.setGender(faker.random().nextInt(0, 1));
            newStaff.setDateOfBirth(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            newStaff.setPhoneNumber(faker.phoneNumber().cellPhone());
            newStaff = staffRepository.save(newStaff);
            staffs.add(newStaff);
        }
        return staffs;
    }

    public List<Member> fakeMembers() {

        List<Member> members = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            User user = new User();
            user.setEmail(faker.internet().emailAddress());
            user.setPasswordDigest(faker.internet().password());
            user.setRole(3);
            userRepository.save(user);

            Member newMember = new Member();
            newMember.setJoinedDate(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            newMember.setWeight(faker.random().nextDouble());
            newMember.setNote(faker.lorem().sentence());
            newMember.setHealthCondition(faker.lorem().sentence());
            newMember.setUser(user);
            newMember.setFirstName(faker.name().firstName());
            newMember.setLastName(faker.name().lastName());
            newMember.setAddress(faker.address().fullAddress());
            newMember.setGender(faker.random().nextInt(0, 1));
            newMember.setDateOfBirth(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            newMember.setPhoneNumber(faker.phoneNumber().cellPhone());
            newMember = memberRepository.save(newMember);
            members.add(newMember);
        }
        return members;
    }

    public List<Feedback> fakeFeedbacks() {
        List<Feedback> feedbacks = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            List<Member> members = memberRepository.findAll();
            List<Gym> gyms = gymRepository.findAll();
            Member randMember = members.get(rand.nextInt(members.size()));
            Gym randGym = gyms.get(rand.nextInt(gyms.size()));

            Feedback feedback = new Feedback();
            feedback.setContent(faker.lorem().sentence());
            feedback.setStars(faker.random().nextInt(1, 5));
            feedback.setGym(randGym);
            feedback.setMember(randMember);

            // Seed Replies
            feedbacks.add(feedbackRepository.save(feedback));
        }
        return feedbacks;
    }

    public List<Membership> fakeMemberships() {
        List<Membership> memberships = new ArrayList<>();

        List<Member> members = memberRepository.findAll();

        List<Staff> staffs = staffRepository.findAll();

        for (int i = 0; i < 10; i++) {
            Membership membership = new Membership();
            membership.setName("Gói fitness 1 tháng");
            membership.setMonthlyPrice(100000 + faker.random().nextLong(100000));
            membership.setMaxNumOfMembers(faker.random().nextInt(0, 50));
            membership.setDescription("Goi tap luyen giup co the san chac");
            membership.setCreatedBy(staffs.get(rand.nextInt(staffs.size())));

            // Seed memberMembership
            for (int j = 0; j < 10; j++) {
                Member randMember = members.get(rand.nextInt(members.size()));
                MemberMembership memberMembership = new MemberMembership();
                memberMembership.setValidFrom(LocalDate.of(2023, 7, 3));
                memberMembership.setValidUntil(LocalDate.of(2023, 9, 3));
                memberMembership.setMembership(membership);
                memberMembership.setCreatedAt(LocalDateTime.now());
                memberMembership.setMember(randMember);

                memberMembershipRepository.save(memberMembership);
            }

            memberships.add(membershipRepository.save(membership));
        }

        return memberships;
    }
}
