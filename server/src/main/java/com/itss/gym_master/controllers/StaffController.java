package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.Membership;
import com.itss.gym_master.entities.Reply;
import com.itss.gym_master.entities.Staff;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.MembershipService;
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
    private final MembershipService membershipService;

    @Autowired
    public StaffController(StaffService staffService,
            MembershipService membershipService) {
        this.staffService = staffService;
        this.membershipService = membershipService;
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

    @PostMapping(consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Staff> newStaff(@RequestBody @Valid Staff staff) {
        return new ResponseEntity<>(staffService.newStaff(staff), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Staff> edit(@RequestBody Staff staff, @PathVariable Long id) {
        return ResponseEntity.ok().body(staffService.editStaff(id, staff));
    }

    @DeleteMapping(value = "/{id}")
    ResponseEntity<Staff> remove(@PathVariable Long id) {
        Staff staff = staffService.removeStaff(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found staff with id " + id));
        return ResponseEntity.ok().body(staff);
    }

    /**
     * Liên quan đến gói tập
     * Thêm mới một gói tập, biết thông tin của người đang đăng nhập
     * 
     * @param newMembership Thông tin cần thiết cho gói tập cần tạo
     * @param id            mã ID của nhân viên tạo gói tập
     * @return Thông tin gói tập vừa tạo
     */
    @PostMapping(value = "/{id}/add-membership", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Membership> newMembership(@RequestBody @Valid Membership newMembership, @PathVariable Long id) {
        return new ResponseEntity<>(membershipService.newMembership(newMembership, id), HttpStatus.CREATED);
    }

    @PostMapping(value = "/{staffId}/feedbacks/{feedbackId}/replies", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Reply> replyFeedback(@PathVariable Long staffId,
            @PathVariable Long feedbackId,
            @RequestBody @Valid Reply reply) {
        return ResponseEntity.ok().body(staffService.replyFeedback(staffId, feedbackId, reply));
    }

    @PutMapping(value = "/{staffId}/replies/{replyId}", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    ResponseEntity<Reply> editReply(@PathVariable Long staffId,
            @PathVariable Long replyId,
            @RequestBody Reply reply) {
        return ResponseEntity.ok().body(staffService.editReply(staffId, replyId, reply));
    }
}
