package com.itss.gym_master.services;

import com.itss.gym_master.entities.MemberMembership;
import com.itss.gym_master.entities.UsageLog;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.exceptions.ExpiredMembershipException;
import com.itss.gym_master.repositories.UsageLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsageLogService {
    private final UsageLogRepository usageLogRepository;
    private final MemberMembershipService memberMembershipService;

    @Autowired
    public UsageLogService(UsageLogRepository usageLogRepository,
                           StaffService staffService,
                           GymService gymService,
                           MemberMembershipService memberMembershipService) {
        this.usageLogRepository = usageLogRepository;
        this.memberMembershipService = memberMembershipService;
    }

    public List<UsageLog> getAllUsageLogs() {
        return usageLogRepository.findAll();
    }

    public Optional<UsageLog> getOneUsageLog(Long id) {
        return usageLogRepository.findById(id);
    }

    public UsageLog newUsageLog(Long memberMembershipId,
                                String note) {
        MemberMembership memberMembership = memberMembershipService
                .getOneMemberMembership(memberMembershipId)
                .orElseThrow(() -> new EntityNotFoundException("Could not found member membership with id " + memberMembershipId));

        if (memberMembership.getHasActivated() && memberMembership.getValidUntil().isAfter(LocalDate.now())
                && memberMembership.getValidFrom().isBefore(LocalDate.now())) {
            UsageLog newUsageLog = new UsageLog();
            newUsageLog.setDateTime(LocalDateTime.now());
            newUsageLog.setMemberMembership(memberMembership);
            newUsageLog.setNote(note);
            return usageLogRepository.save(newUsageLog);
        }
        else throw new ExpiredMembershipException("Could not use this membership because it's already expired");
    }

    public UsageLog removeUsageLog(Long id) {
        UsageLog log = usageLogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found usage log with id " + id));
        usageLogRepository.deleteById(id);
        return log;
    }
}
