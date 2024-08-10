package com.exam.controller;

import com.exam.model.User;

import com.exam.model.exam.UserQuiz;
import com.exam.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserProfileController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        User user = userService.getUser(authentication.getName());
        if (user != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);

            List<UserQuiz> userQuizzes = userService.getUserQuizzes(authentication.getName());
            int totalQuizzesTaken = userQuizzes.size();
            int totalMarksEarned = userQuizzes.stream().mapToInt(UserQuiz::getMarksEarned).sum();
            double avgScore = totalQuizzesTaken > 0 ? (double) totalMarksEarned / totalQuizzesTaken : 0;

            response.put("totalQuizzesTaken", totalQuizzesTaken);
            response.put("totalMarksEarned", totalMarksEarned);
            response.put("averageScore", avgScore);

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/quizzes")
    public ResponseEntity<?> getUserQuizzes(Authentication authentication) {
        List<UserQuiz> userQuizzes = userService.getUserQuizzes(authentication.getName());
        return ResponseEntity.ok(userQuizzes);
    }
}