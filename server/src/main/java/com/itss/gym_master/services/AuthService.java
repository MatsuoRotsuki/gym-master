package com.itss.gym_master.services;

import com.itss.gym_master.entities.Member;
import com.itss.gym_master.entities.User;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User login(String email, String password) {
        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Could not find user with that email"));
        if (!user.getPasswordDigest().equals(password)) {
            throw new EntityNotFoundException("Password is not correct");
        }
        if (user.getStaff() != null) {
            user.setId(user.getStaff().getId());
        } else {
            user.setId(user.getMember().getId());
        }
        return user;
    }

    public User signUp(User user) {
        Member member = new Member();
        user.setMember(member);
        return userRepository.save(user);
    }
}
