package com.exam.controller;

import com.exam.model.exam.Quiz;
import com.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Add a new quiz
    @PostMapping("/")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz) {
        Quiz savedQuiz = quizService.addQuiz(quiz);
        return ResponseEntity.ok(savedQuiz);
    }

    // Update an existing quiz
    @PutMapping("/")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz) {
        Quiz updatedQuiz = quizService.updateQuiz(quiz);
        return ResponseEntity.ok(updatedQuiz);
    }

    // Get all quizzes
    @GetMapping("/")
    public ResponseEntity<Set<Quiz>> qizzes() {
        Set<Quiz> quizzes = quizService.getQuizzes();
        return ResponseEntity.ok(quizzes);
    }

    // Get a single quiz by ID
    @GetMapping("/{qid}")
    public ResponseEntity<Quiz> qid(@PathVariable Long qid) {
        Quiz quiz = quizService.getQuiz(qid);
        return ResponseEntity.ok(quiz);
    }

    // Delete a quiz by ID
    @DeleteMapping("/{qid}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long qid) {
        quizService.deleteQuiz(qid);
        return ResponseEntity.ok().build();
    }
}
