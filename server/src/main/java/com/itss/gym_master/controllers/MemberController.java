package com.itss.gym_master.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itss.gym_master.entities.Feedback;
import com.itss.gym_master.entities.Member;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.MemberMembershipService;
import com.itss.gym_master.services.MemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/members")
public class MemberController {
    public final MemberService memberService;
    public final MemberMembershipService memberMembershipService;

    @Autowired
    public MemberController(MemberService memberService,
                            MemberMembershipService memberMembershipService) {
        this.memberService = memberService;
        this.memberMembershipService = memberMembershipService;
    }

    @GetMapping()
    ResponseEntity<List<Member>> all() {
        return ResponseEntity.ok().body(memberService.getAllMembers());
    }

    @PostMapping(consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Member> postM(@RequestBody @Valid Member member) {
        return new ResponseEntity<>(memberService.newMember(member), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    ResponseEntity<Member> one(@PathVariable Long id) {
        Member member = memberService.getOneMember(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found member with id " + id));
        return ResponseEntity.ok().body(member);
    }

    @PutMapping(value = "/{id}", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Member> edit(@RequestBody Member member, @PathVariable Long id) {
        return ResponseEntity.ok().body(memberService.editMember(id, member));
    }

    @DeleteMapping(value = "/{id}")
    ResponseEntity<Member> remove(@PathVariable Long id) {
        Member member = memberService.removeMember(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found member with id " + id));
        return ResponseEntity.ok().body(member);
    }

    @PostMapping(value = "/{memberId}/gyms/{gymId}/feedbacks", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Feedback> newFeedback(
            @PathVariable Long memberId,
            @PathVariable Long gymId,
            @RequestBody @Valid Feedback feedback) {
        return new ResponseEntity<>(memberService.createFeedback(memberId, gymId, feedback), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}/ban", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Member> ban(@RequestBody JsonNode jsonNode, @PathVariable Long id) {
        String banReason = jsonNode.get("banReason").isNull() ? null : jsonNode.get("banReason").asText();
        Member member = memberService.banMember(id, banReason);

        return ResponseEntity.ok().body(member);
    }

    @PutMapping(value = "/{id}/unban", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Member> unban(@PathVariable Long id) {
        Member member = memberService.unbanMember(id);
        return ResponseEntity.ok().body(member);
    }

    @PutMapping(value = "/password/{id}", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Member> editPassword(@PathVariable Long id, @RequestBody ObjectNode data) {
        return ResponseEntity.ok().body(memberService.editPassword(id, data.get("oldPassword").asText(),
                data.get("newPassword").asText()));
    }
}
