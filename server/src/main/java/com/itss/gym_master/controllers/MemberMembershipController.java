package com.itss.gym_master.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itss.gym_master.entities.MemberMembership;
import com.itss.gym_master.entities.MembershipActivityLog;
import com.itss.gym_master.entities.UsageLog;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.MemberMembershipService;
import com.itss.gym_master.services.UsageLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/member-memberships")
public class MemberMembershipController {
    private final MemberMembershipService memberMembershipService;
    private final UsageLogService usageLogService;

    @Autowired
    public MemberMembershipController(MemberMembershipService memberMembershipService,
                                      UsageLogService usageLogService) {
        this.memberMembershipService = memberMembershipService;
        this.usageLogService = usageLogService;
    }

    @GetMapping()
    public ResponseEntity<List<MemberMembership>> all() {
        return ResponseEntity.ok().body(memberMembershipService.getAllMemberMembership());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<MemberMembership> one(@PathVariable Long id) {
        MemberMembership memberMembership = memberMembershipService.getOneMemberMembership(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found registration with id " + id));
        return ResponseEntity.ok().body(memberMembership);
    }

    @PostMapping(value = "/register", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    public ResponseEntity<Object> requestToRegister(@RequestBody ObjectNode jsonNode) {

        Long memberId = jsonNode.get("memberId").asLong();
        Long membershipId = jsonNode.get("membershipId").asLong();
        Long periodOfMonths = jsonNode.get("periodOfMonths").asLong();
        String note = jsonNode.get("note").isNull() ? null : jsonNode.get("note").asText();

        MembershipActivityLog log = new MembershipActivityLog();
        log.setPeriodOfMonths(periodOfMonths);
        log.setNote(note);

        return new ResponseEntity<>(memberMembershipService.requestToRegister(memberId, membershipId, log), HttpStatus.CREATED);
    }

    @PostMapping(value = "/{id}/renew", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    public ResponseEntity<Object> renew(@PathVariable Long id,
                                        @RequestBody JsonNode jsonNode) {
        Long periodOfMonths = jsonNode.get("periodOfMonths").asLong();
        String note = jsonNode.get("note").isNull() ? null : jsonNode.get("note").asText();

        MembershipActivityLog log = new MembershipActivityLog();
        log.setPeriodOfMonths(periodOfMonths);
        log.setNote(note);

        return new ResponseEntity<>(memberMembershipService.requestToRenew(id, log), HttpStatus.CREATED);
    }

    /**
     * Tiếp nhận api ghi lich sử sử dụng
     *
     * @param id       mã đăng ký gói tập
     * @param jsonNode thông tin cần thiết để ghi lịch sử sử dụng
     * @return Trả về thông tin lịch sử sử dụng vừa ghi
     */
    @PostMapping(value = "/{id}/usage-log", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    public ResponseEntity<UsageLog> logUsage(@PathVariable Long id,
                                             @RequestBody JsonNode jsonNode) {
        String note = jsonNode.get("note").isNull() ? null : jsonNode.get("note").asText();

        return ResponseEntity.ok().body(usageLogService.newUsageLog(id, note));
    }
}
