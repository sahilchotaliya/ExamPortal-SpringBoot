package com.exam.services.impl;

import com.exam.model.User;

import com.exam.model.exam.Quiz;
import com.exam.model.exam.UserQuiz;
import com.exam.repo.QuizRepository;
import com.exam.repo.UserQuizRepository;
import com.exam.repo.UserRepository;
import com.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class QuizServiceImpl implements QuizService {
    @Autowired
    private UserQuizRepository userQuizRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QuizRepository quizRepository;
    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizzes() {
        return new HashSet<>(this.quizRepository.findAll());

    }

    @Override
    public Quiz getQuiz(Long quizId) {
        return this.quizRepository.findById(quizId).get();
    }

    @Override
    public void deleteQuiz(Long quizId) {


    this.quizRepository.deleteById(quizId);
    }

    @Override
    public Set<Quiz> getQuizzesByCategory(Long categoryId) {
        return quizRepository.findByCategoryCid(categoryId);
    }

    @Override
    public Set<Quiz> getActiveQuizzes() {
        return new HashSet<>(this.quizRepository.findByActive(true));
    }

    @Override
    public Set<Quiz> getActiveQuizzesOfCategory(Long categoryId) {
        return this.quizRepository.findByCategoryCidAndActive(categoryId, true);
    }

    @Override
    public UserQuiz saveUserQuiz(String username, Long quizId, int marksEarned) {
        User user = userRepository.findByUsername(username);
        System.out.println("profile user");
        Quiz quiz = this.getQuiz(quizId);
        if (user != null && quiz != null) {
            UserQuiz userQuiz = new UserQuiz();
            userQuiz.setUser(user);
            userQuiz.setQuiz(quiz);
            userQuiz.setMarksEarned(marksEarned);
            userQuiz.setAttemptDate(LocalDateTime.now());
            return userQuizRepository.save(userQuiz);
        }
        return null;
    }
}
