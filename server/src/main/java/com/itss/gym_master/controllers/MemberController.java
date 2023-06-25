package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.Feedback;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.itss.gym_master.entities.*;
import com.itss.gym_master.services.MemberService;

import jakarta.validation.Valid;

import java.util.List;


@RestController
@RequestMapping("api/v1/members")
public class MemberController {
    public final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping()
    ResponseEntity<List<Member>> all() {
        return ResponseEntity.ok().body(memberService.getAllMembers());
    }

    @PostMapping(consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Member> postM(@RequestBody @Valid Member member) {
        return new ResponseEntity<>(memberService.newMember(member), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    ResponseEntity<Member> one(@PathVariable Long id) {
        Member member = memberService.getOneMember(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found member with id " + id));
        return ResponseEntity.ok().body(member);
    }

    @PutMapping(value = "/{id}", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Member> edit(@RequestBody Member member, @PathVariable Long id) {
        return ResponseEntity.ok().body(memberService.editMember(id, member));
    }

    @DeleteMapping(value = "/{id}")
    ResponseEntity<Member> remove(@PathVariable Long id) {
        Member member = memberService.removeMember(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found member with id " + id));
        return ResponseEntity.ok().body(member);
    }

    @PostMapping("/{memberId}/gyms/{gymId}/feedbacks")
    ResponseEntity<Feedback> newFeedback(
            @PathVariable Long memberId,
            @PathVariable Long gymId,
            @RequestBody @Valid Feedback feedback) {
        return new ResponseEntity<>(memberService.createFeedback(memberId, gymId, feedback), HttpStatus.CREATED);
    }
}
