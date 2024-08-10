package com.exam.services.impl;

import com.exam.model.User;
import com.exam.model.exam.UserQuiz;
import com.exam.model.UserRole;
import com.exam.model.exam.UserQuiz;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserQuizRepository;
import com.exam.repo.UserRepository;
import com.exam.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserQuizRepository userQuizRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        // Check if user already exists
        User local = this.userRepository.findByUsername(user.getUsername());
        if (local != null) {
            System.out.println("User is already there");
            throw new Exception("User already present");
        } else {
            // Save each role in userRoles set to the role repository
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }

            // Assign userRoles to the user
            user.getUserRoles().addAll(userRoles);

            // Save the user
            local = this.userRepository.save(user);
        }

        return local;
    }


    //getting user by user name
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public User updateUser(User user) throws Exception {
        User existingUser = this.userRepository.findById(user.getId())
                .orElseThrow(() -> new Exception("User not found"));

        // Update the user's properties here
       existingUser.setFirstname(user.getFirstname());
        existingUser.setEmail(user.getEmail());
        // Update other fields as necessary

        return this.userRepository.save(existingUser);
    }

    @Override
    public List<UserQuiz> getUserQuizzes(String username) {
        return userQuizRepository.findByUserUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

}
