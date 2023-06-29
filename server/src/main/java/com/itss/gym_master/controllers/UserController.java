package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.User;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
    public final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping()
    ResponseEntity<List<User>> all() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @PostMapping(consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<User> newUser(@RequestBody @Valid User user) {
        return new ResponseEntity<>(userService.newUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    ResponseEntity<User> one(@PathVariable Long id) {
        User user = userService.getOneUser(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found user with id " + id));
        return ResponseEntity.ok().body(user);
    }

    @PutMapping(value = "/{id}", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<User> edit(@RequestBody User user, @PathVariable Long id) {
        return ResponseEntity.ok().body(userService.editUser(id, user));
    }

    @DeleteMapping(value = "/{id}")
    ResponseEntity<User> remove(@PathVariable Long id) {
        User user = userService.removeUser(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found user with id " + id));
        return ResponseEntity.ok().body(user);
    }
}
