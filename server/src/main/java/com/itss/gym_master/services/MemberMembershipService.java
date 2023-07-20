package com.itss.gym_master.services;

import com.itss.gym_master.entities.Member;
import com.itss.gym_master.entities.MemberMembership;
import com.itss.gym_master.entities.Membership;
import com.itss.gym_master.entities.MembershipActivityLog;
import com.itss.gym_master.exceptions.AlreadyRegisteredMembershipException;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.MemberMembershipRepository;
import com.itss.gym_master.repositories.MemberRepository;
import com.itss.gym_master.repositories.MembershipActivityLogRepository;
import com.itss.gym_master.repositories.MembershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MemberMembershipService {
    private final MemberMembershipRepository memberMembershipRepository;
    private final MemberRepository memberRepository;
    private final MembershipRepository membershipRepository;
    private final MembershipActivityLogRepository membershipActivityLogRepository;

    @Autowired
    public MemberMembershipService(MemberMembershipRepository memberMembershipRepository,
                                   MemberRepository memberRepository,
                                   MembershipRepository membershipRepository,
                                   MembershipActivityLogRepository membershipActivityLogRepository) {
        this.memberMembershipRepository = memberMembershipRepository;
        this.memberRepository = memberRepository;
        this.membershipRepository = membershipRepository;
        this.membershipActivityLogRepository = membershipActivityLogRepository;
    }

    public List<MemberMembership> getAllMemberMembership() {
        return memberMembershipRepository.findAll();
    }

    public Optional<MemberMembership> getOneMemberMembership(Long id) {
        return memberMembershipRepository.findById(id);
    }

    public MemberMembership requestToRegister(Long memberId, Long membershipId, MembershipActivityLog log) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Could not found member with id " + memberId));
        Membership membership = membershipRepository.findById(membershipId)
                .orElseThrow(() -> new EntityNotFoundException("Could not found membership with id " + membershipId));

        for (MemberMembership memberMembership : member.getMemberMemberships()) {
            if (memberMembership.getMembership().getId().equals(membershipId))
            {
                throw new AlreadyRegisteredMembershipException("The member has already registered that membership");
            }
        }

        MemberMembership memberMembership = new MemberMembership();
        memberMembership.setMember(member);
        memberMembership.setMembership(membership);
        memberMembership.setCreatedAt(LocalDateTime.now());

        log.setType(0);

        log.setMemberMembership(memberMembership);
        memberMembership.getMembershipActivityLogs().add(membershipActivityLogRepository.save(log));

        return memberMembershipRepository.save(memberMembership);
    }

    public MemberMembership requestToRenew(Long id, MembershipActivityLog log) {
        MemberMembership memberMembership = memberMembershipRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found registration with id " + id));

        log.setType(1);
        log.setMemberMembership(memberMembership);
        memberMembership.getMembershipActivityLogs().add(membershipActivityLogRepository.save(log));

        return memberMembership;
    }

}
