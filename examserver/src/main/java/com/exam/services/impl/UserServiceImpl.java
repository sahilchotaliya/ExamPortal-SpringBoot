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

	private final UserQuizRepository userQuizRepository;
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;

	public UserServiceImpl(UserQuizRepository userQuizRepository, UserRepository userRepository,
			RoleRepository roleRepository) {
		this.userQuizRepository = userQuizRepository;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
	}

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        // Check if user already exists
        User local =  userRepository.findByUsername(user.getUsername());
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
            local =  userRepository.save(user);
        }

        return local;
    }


    //getting user by user name
    @Override
    public User getUser(String username) {
        return  userRepository.findByUsername(username);
    }

    @Override
    public User updateUser(User user) throws Exception {
        User existingUser =  userRepository.findById(user.getId())
                .orElseThrow(() -> new Exception("User not found"));

        // Update the user's properties here
       existingUser.setFirstname(user.getFirstname());
        existingUser.setEmail(user.getEmail());
        // Update other fields as necessary

        return  userRepository.save(existingUser);
    }

    @Override
    public List<UserQuiz> getUserQuizzes(String username) {
        return userQuizRepository.findByUserUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
         userRepository.deleteById(userId);
    }

}
