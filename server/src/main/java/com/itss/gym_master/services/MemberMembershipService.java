package com.itss.gym_master.services;

import com.itss.gym_master.repositories.MemberMembershipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberMembershipService {
    private final MemberMembershipRepository memberMembershipRepository;

    @Autowired
    public MemberMembershipService(MemberMembershipRepository memberMembershipRepository) {
        this.memberMembershipRepository = memberMembershipRepository;
    }
}
