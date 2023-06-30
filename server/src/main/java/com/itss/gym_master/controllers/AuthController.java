package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.User;
import com.itss.gym_master.services.MemberService;
import com.itss.gym_master.services.StaffService;
import com.itss.gym_master.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final MemberService memberService;
    private final StaffService staffService;
    private final UserService userService;

    @Autowired
    public AuthController(MemberService memberService,
                          StaffService staffService,
                          UserService userService) {
        this.memberService = memberService;
        this.staffService = staffService;
        this.userService = userService;
    }

//    @PostMapping(value = "login", consumes = "application/json;charset=UTF-8",
//            produces = "application/json;charset=UTF-8")
//    ResponseEntity<User> login (@RequestBody User user) {
//        return
//    }

//    @PostMapping(value = "login", consumes = "application/json;charset=UTF-8",
//            produces = "application/json;charset=UTF-8")
//    ResponseEntity<User> register(@RequestBody User user) {
//
//    }
}
