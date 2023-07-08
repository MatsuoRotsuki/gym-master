package com.itss.gym_master.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.itss.gym_master.entities.User;
import com.itss.gym_master.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "login", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<User> login(@RequestBody ObjectNode objectNode) {
        return ResponseEntity.ok().body(
                authService.login(objectNode.get("email").asText(), objectNode.get("password").asText())
        );
    }

    @PostMapping(value = "signup", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<User> signUp(@RequestBody User user) {
        return ResponseEntity.ok().body(
                authService.signUp(user)
        );
    }
}
