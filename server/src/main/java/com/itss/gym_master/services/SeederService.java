package com.itss.gym_master.services;

import com.github.javafaker.Faker;
import com.github.javafaker.Internet;
import com.itss.gym_master.entities.*;
import com.itss.gym_master.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.ZoneId;
import java.util.ArrayList;
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

    public static final Faker faker = new Faker();

    @Autowired
    public SeederService(EquipmentRepository equipmentRepository,
                         GymRepository gymRepository,
                         UserRepository userRepository,
                         MemberRepository memberRepository,
                         StaffRepository staffRepository,
                         MembershipRepository membershipRepository) {
        this.equipmentRepository = equipmentRepository;
        this.gymRepository = gymRepository;
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
        this.staffRepository = staffRepository;
        this.membershipRepository = membershipRepository;
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
            user.setAddress(faker.address().fullAddress());
            user.setGender(faker.random().nextInt(0,1));
            user.setEmail(faker.internet().emailAddress());
            user.setPasswordDigest(faker.internet().password());
            user.setDateOfBirth(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            user.setPhoneNumber(faker.phoneNumber().cellPhone());
            user.setRole(2);
            user = userRepository.save(user);

            Staff newStaff = new Staff();
            List<String> positions = List.of("Sales", "Trainer", "Receptionist");
            newStaff.setPosition(positions.get(new Random().nextInt(positions.size())));
            newStaff.setEmploymentStatus(faker.random().nextInt(1,3));
            newStaff.setNote(faker.lorem().sentence());
            newStaff.setHiredDate(Date.valueOf(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate()));
            newStaff.setSalary(1000000L + faker.random().nextInt(0, 5000000));
            newStaff.setUser(user);
            newStaff = staffRepository.save(newStaff);
            staffs.add(newStaff);
        }
        return staffs;
    }

    public List<Member> fakeMembers() {

        List<Member> members = new ArrayList<>();

        for(int i = 0; i < 100; i++) {
            User user = new User();
            user.setAddress(faker.address().fullAddress());
            user.setGender(faker.random().nextInt(2));
            user.setEmail(faker.internet().emailAddress());
            user.setPasswordDigest(faker.internet().password());
            user.setDateOfBirth(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            user.setPhoneNumber(faker.phoneNumber().cellPhone());
            user.setRole(3);
            userRepository.save(user);

            Member newMember = new Member();
            newMember.setJoinedDate(faker.date().birthday().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
            newMember.setWeight(faker.random().nextDouble());
            newMember.setNote(faker.lorem().sentence());
            newMember.setHealthCondition(faker.lorem().sentence());
            newMember.setUser(user);
            newMember = memberRepository.save(newMember);
            members.add(newMember);
        }
        return members;
    }
}