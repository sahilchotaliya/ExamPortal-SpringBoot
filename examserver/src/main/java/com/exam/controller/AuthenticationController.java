package com.exam.controller;

import com.exam.config.JwtAuthenticationFilter;
import com.exam.model.JwtRequest;
import com.exam.model.JwtResponse;
import com.exam.model.User;
import com.exam.services.impl.UserDetailServiceImpl;
import com.exam.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Principal;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/generate-token")
    public ResponseEntity<JwtResponse> createToken(@RequestBody JwtRequest jwtRequest) {
        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())
            );

            // Load user details and generate the token
            UserDetails userDetails = userDetailService.loadUserByUsername(jwtRequest.getUsername());
            String token = jwtUtil.generateToken(userDetails);

            logger.info("Token generated successfully for user: " + jwtRequest.getUsername());
            return ResponseEntity.ok(new JwtResponse(token));

        } catch (BadCredentialsException e) {
            logger.error("Bad credentials for user: " + jwtRequest.getUsername(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JwtResponse("Invalid username or password"));

        } catch (Exception e) {
            logger.error("Authentication failed for user: " + jwtRequest.getUsername(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new JwtResponse("Authentication failed"));
        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        System.out.println("(Sahil Choytaliya get current user \");");
        logger.info("Attempting to get current user");
        if (principal == null) {
            logger.warn("Principal is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        try {
            User user = (User) this.userDetailService.loadUserByUsername(principal.getName());
            logger.info("Current user retrieved: {}", user.getUsername());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            logger.error("Error retrieving current user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user information");
        }
    }

}
