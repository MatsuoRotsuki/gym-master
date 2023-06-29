package com.itss.gym_master.services;

import com.itss.gym_master.repositories.MembershipActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MembershipActivityLogService {
    private final MembershipActivityLogRepository membershipActivityLogRepository;

    @Autowired
    public MembershipActivityLogService(MembershipActivityLogRepository membershipActivityLogRepository) {
        this.membershipActivityLogRepository = membershipActivityLogRepository;
    }
}
