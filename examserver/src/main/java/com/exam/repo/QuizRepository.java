package com.exam.repo;

import com.exam.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuizRepository extends JpaRepository<Quiz , Long> {
    // In QuizRepository
    Set<Quiz> findByCategoryCid(Long cid);
    Set<Quiz> findByActive(Boolean active);
    Set<Quiz> findByCategoryCidAndActive(Long cid, Boolean active);
}
