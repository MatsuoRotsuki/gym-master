package com.itss.gym_master.services;

import com.itss.gym_master.repositories.UsageLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsageLogService {
    private final UsageLogRepository usageLogRepository;

    @Autowired
    public UsageLogService(UsageLogRepository usageLogRepository) {
        this.usageLogRepository = usageLogRepository;
    }
}
