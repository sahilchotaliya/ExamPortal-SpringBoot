package com.exam.controller;


import com.exam.model.exam.Quiz;
import com.exam.model.exam.UserQuiz;
import com.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {

	private QuizService quizService;

	QuizController(QuizService quizService) {
		this.quizService = quizService;
	}
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
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Set<Quiz>> getQuizzesByCategory(@PathVariable Long categoryId) {
        Set<Quiz> quizzes = quizService.getQuizzesByCategory(categoryId);
        return ResponseEntity.ok(quizzes);
    }
    @GetMapping("/active")
    public ResponseEntity<Set<Quiz>> getActiveQuizzes() {
        Set<Quiz> quizzes = quizService.getActiveQuizzes();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/category/{categoryId}/active")
    public ResponseEntity<Set<Quiz>> getActiveQuizzesOfCategory(@PathVariable Long categoryId) {
        Set<Quiz> quizzes = quizService.getActiveQuizzesOfCategory(categoryId);
        return ResponseEntity.ok(quizzes);
    }
    @PostMapping("/{quizId}/submit")
    public ResponseEntity<?> submitQuiz(@PathVariable Long quizId, @RequestBody Map<String, Integer> request, Authentication authentication) {
        Integer marksEarned = request.get("marksEarned");
        if (marksEarned == null) {
            return ResponseEntity.badRequest().body("Marks earned is required");
        }
        UserQuiz userQuiz = quizService.saveUserQuiz(authentication.getName(), quizId, marksEarned);
        if (userQuiz != null) {
            return ResponseEntity.ok(userQuiz);
        }
        return ResponseEntity.badRequest().body("Failed to save quiz result");
    }
}
