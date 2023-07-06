package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.*;
import com.itss.gym_master.services.FeedbackService;
import com.itss.gym_master.services.SeederService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/db")
public class DatabaseController {
    private final SeederService seederService;

    @Autowired
    public DatabaseController(SeederService seederService) {
        this.seederService = seederService;
    }

    @GetMapping("gyms/seed")
    public ResponseEntity<List<Gym>> seedGyms() {
        return ResponseEntity.ok().body(seederService.fakeGyms());
    }

    @GetMapping("staffs/seed")
    public ResponseEntity<List<Staff>> seedStaffs() {
        return ResponseEntity.ok().body(seederService.fakeStaffs());
    }

    @GetMapping("members/seed")
    public ResponseEntity<List<Member>> seedMembers() {
        return ResponseEntity.ok().body(seederService.fakeMembers());
    }

    @GetMapping("feedbacks/seed")
    public ResponseEntity<List<Feedback>> seedFeedbacks() {
        return ResponseEntity.ok().body(seederService.fakeFeedbacks());
    }

    @GetMapping("memberships/seed")
    public ResponseEntity<List<Membership>> seedMemberships() {
        return ResponseEntity.ok().body(seederService.fakeMemberships());
    }
}