package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.MembershipActivityLog;
import com.itss.gym_master.entities.Payment;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.MembershipActivityLogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/member-activity-logs")
public class MembershipActivityLogController {
    private final MembershipActivityLogService membershipActivityLogService;

    @Autowired
    public MembershipActivityLogController(MembershipActivityLogService membershipActivityLogService) {
        this.membershipActivityLogService = membershipActivityLogService;
    }

    @GetMapping()
    public ResponseEntity<List<MembershipActivityLog>> all() {
        return ResponseEntity.ok().body(membershipActivityLogService.getAllMembershipActivityLogs());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<MembershipActivityLog> one(@PathVariable Long id) {
        MembershipActivityLog log = membershipActivityLogService.getOneMembershipActivityLog(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found membership activity log with id " + id));
        return ResponseEntity.ok().body(log);
    }

    @PostMapping(value = "/{id}/confirm-payment", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    public ResponseEntity<MembershipActivityLog> confirmPayment(@PathVariable Long id,
                                                                @RequestBody @Valid Payment payment) {
        return new ResponseEntity<>(membershipActivityLogService.confirmPayment(id, payment), HttpStatus.CREATED);
    }

    @PostMapping(value = "/{id}/abort-payment")
    public ResponseEntity<MembershipActivityLog> abortPayment(@PathVariable Long id) {
        return ResponseEntity.ok().body(membershipActivityLogService.abortPayment(id));
    }
}