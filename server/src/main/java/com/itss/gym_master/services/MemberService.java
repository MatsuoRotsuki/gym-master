package com.itss.gym_master.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itss.gym_master.entities.Member;
import com.itss.gym_master.repositories.MemberRepository;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Member newMember(Member member) {
        return memberRepository.save(member);
    }

    public Optional<Member> getOneMember(Long id) {
        return memberRepository.findById(id);
    }

    public Member editMember(Long id, Member newMember) {
        return memberRepository.findById(id).map(member -> {
            member.setJoinedDate(newMember.getJoinedDate());
            member.setWeight(newMember.getWeight());
            member.setHealthCondition(newMember.getHealthCondition());
            member.setIsBanned(newMember.getIsBanned());
            member.setBannedReason(newMember.getBannedReason());
            member.setNote(newMember.getNote());
            return memberRepository.save(member);
        }).orElseGet(() -> {
            newMember.setId(id);
            return memberRepository.save(newMember);
        });
    }

    public Optional<Member> removeMember(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        memberRepository.deleteById(id);
        return member;
    }
}
