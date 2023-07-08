package com.itss.gym_master.controllers;

import com.itss.gym_master.services.SeederService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/db")
public class DatabaseController {
    private final SeederService seederService;

    @Autowired
    public DatabaseController(SeederService seederService) {
        this.seederService = seederService;
    }

    @GetMapping("seed")
    public ResponseEntity<String> seed() {
        seederService.fakeMembers();
        seederService.fakeStaffs();
        seederService.fakeGyms();
        seederService.fakeMemberships();
        seederService.fakeFeedbacks();
        return ResponseEntity.ok().body("Success :))))");
    }
}
