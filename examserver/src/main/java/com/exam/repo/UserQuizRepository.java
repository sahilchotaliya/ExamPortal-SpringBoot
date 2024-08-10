package com.exam.repo;

import com.exam.model.exam.UserQuiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserQuizRepository extends JpaRepository<UserQuiz, Long> {
    List<UserQuiz> findByUserUsername(String username);
}