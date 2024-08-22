package com.exam.services.impl;

import com.exam.model.User;
import com.exam.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

	private UserRepository userRepository;

	UserDetailServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

    private static final Logger logger = LoggerFactory.getLogger(UserDetailServiceImpl.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("Attempting to load user: " + username);

        if (username == null || username.isEmpty()) {
            logger.error("Attempted to load user with null or empty username");
            throw new UsernameNotFoundException("Username cannot be null or empty");
        }

        User user =  userRepository.findByUsername(username);
        System.out.println("SASSASASSASSASAS"+username);
        if (user == null) {
            logger.error("User not found with username: " + username);
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        logger.info("User object: " + user.toString());

        logger.info("User found: " + user.getUsername());
        return user;
    }
}
