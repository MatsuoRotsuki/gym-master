package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.Membership;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/memberships")
public class MembershipController {
    private final MembershipService membershipService;

    @Autowired
    public MembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @GetMapping()
    ResponseEntity<List<Membership>> all() {
        return ResponseEntity.ok().body(membershipService.getAllMemberships());
    }

    @GetMapping("/{id}")
    ResponseEntity<Membership> one(@PathVariable Long id) {
        Membership membership = membershipService.getOneMembership(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found membership with id " + id));
        return ResponseEntity.ok().body(membership);
    }

//    @PostMapping(consumes = "application/json;charset=UTF-8",
//            produces = "application/json;charset=UTF-8")
//    ResponseEntity<Membership> newMembership(@RequestBody @Valid Membership membership) {
//        return new ResponseEntity<>(membershipService.newMembership(membership), HttpStatus.CREATED);
//    }

    @PutMapping(value = "/{id}", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Membership> edit(@RequestBody Membership membership, @PathVariable Long id) {
        return ResponseEntity.ok().body(membershipService.editMembership(id, membership));
    }

    @DeleteMapping(value = "/{id}")
    ResponseEntity<Membership> remove(@PathVariable Long id) {
        Membership membership = membershipService.removeMembership(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found membership with id " + id));
        return ResponseEntity.ok().body(membership);
    }
}