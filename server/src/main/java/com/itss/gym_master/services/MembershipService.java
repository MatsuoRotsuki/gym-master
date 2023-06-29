package com.itss.gym_master.services;

import com.itss.gym_master.entities.Membership;
import com.itss.gym_master.entities.Staff;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.MembershipRepository;
import com.itss.gym_master.repositories.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembershipService {
    private final MembershipRepository membershipRepository;
    private final StaffRepository staffRepository;

    @Autowired
    public MembershipService(MembershipRepository membershipRepository,
                             StaffRepository staffRepository) {
        this.membershipRepository = membershipRepository;
        this.staffRepository = staffRepository;
    }

    public List<Membership> getAllMemberships() {
        return membershipRepository.findAll();
    }

    public Staff newMembership(Membership newMembership, Long id) {
        return staffRepository.findById(id).map(staff -> {
            staff.getMemberships().add(membershipRepository.save(newMembership));
            return staffRepository.save(staff);
        }).orElseThrow(() -> new EntityNotFoundException("Could not found staff with id " + id));
    }

    public Optional<Membership> getOneMembership(Long id) {
        return membershipRepository.findById(id);
    }

    public Membership editMembership(Long id, Membership newMembership) {
        return membershipRepository.findById(id).map(membership -> {
            membership.setName(newMembership.getName());
            membership.setMonthlyPrice(newMembership.getMonthlyPrice());
            membership.setDescription(newMembership.getDescription());
            membership.setMaxNumOfMembers(newMembership.getMaxNumOfMembers());
            return membershipRepository.save(membership);
        }).orElseThrow(() -> new EntityNotFoundException("Could not found membership with id " + id));
    }

    public Optional<Membership> removeMembership(Long id) {
        Optional<Membership> membership = membershipRepository.findById(id);
        membershipRepository.deleteById(id);
        return membership;
    }
}
