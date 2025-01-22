package com.exam.services;

import com.exam.model.exam.UserQuiz;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.UserQuiz;

import java.util.Optional;
import java.util.Set;

public interface QuizService {

    public Quiz addQuiz(Quiz quiz);
    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getQuizzes();
    public  Optional<Quiz> getQuiz(Long quizId);
    public void deleteQuiz(Long quizId);
    // In QuizService interface
    Set<Quiz> getQuizzesByCategory(Long categoryId);
    Set<Quiz> getActiveQuizzes();
    Set<Quiz> getActiveQuizzesOfCategory(Long categoryId);
    UserQuiz saveUserQuiz(String username, Long quizId, int marksEarned);
}
