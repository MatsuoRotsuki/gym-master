package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.Staff;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.StaffService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/staffs")
public class StaffController {
    private final StaffService staffService;

    @Autowired
    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping()
    public ResponseEntity<List<Staff>> all() {
        return ResponseEntity.ok().body(staffService.getAllStaffs());
    }

    @GetMapping("/{id}")
    ResponseEntity<Staff> one(@PathVariable Long id) {
        Staff staff = staffService.getOneStaff(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found user with id " + id));
        return ResponseEntity.ok().body(staff);
    }

    @PostMapping(consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Staff> newStaff(@RequestBody @Valid Staff staff) {
        return new ResponseEntity<>(staffService.newStaff(staff), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Staff> edit(@RequestBody Staff staff, @PathVariable Long id) {
        return ResponseEntity.ok().body(staffService.editStaff(id, staff));
    }

    @DeleteMapping(value = "/{id}")
    ResponseEntity<Staff> remove(@PathVariable Long id) {
        Staff staff = staffService.removeStaff(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found staff with id " + id));
        return ResponseEntity.ok().body(staff);
    }
}
