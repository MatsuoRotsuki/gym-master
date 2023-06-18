package com.itss.gym_master.services;

import com.itss.gym_master.entities.User;
import com.itss.gym_master.repositories.GymRepository;
import com.itss.gym_master.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository,
                       GymRepository gymRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User newUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getOneUser(Long id) {
        return userRepository.findById(id);
    }

    public User editUser(Long id, User newUser) {
        return userRepository.findById(id).map(user -> {
            user.setEmail(newUser.getEmail());
            user.setGender(newUser.getGender());
            user.setPasswordDigest(newUser.getPasswordDigest());
            user.setRole(newUser.getRole());
            user.setDateOfBirth(newUser.getDateOfBirth());
            return userRepository.save(user);
        }).orElseGet(() -> {
            newUser.setId(id);
            return userRepository.save(newUser);
        });
    }

    public Optional<User> removeUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        userRepository.deleteById(id);
        return user;
    }
}
