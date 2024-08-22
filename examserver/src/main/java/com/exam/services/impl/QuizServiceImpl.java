package com.exam.services.impl;

import com.exam.exception.QuizNotFoundException;
import com.exam.exception.UserNotFoundException;
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
import java.util.Optional;
import java.util.Set;

@Service
public class QuizServiceImpl implements QuizService {
    private UserQuizRepository userQuizRepository;
    private UserRepository userRepository;
    private QuizRepository quizRepository;
    
    QuizServiceImpl(UserQuizRepository userQuizRepository , UserRepository userRepository , QuizRepository quizRepository) {
    	this.userQuizRepository = userQuizRepository;
    	this.userRepository = userRepository;
    	this.quizRepository = quizRepository;
	}
    
    @Override
    public Quiz addQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizzes() {
        return new HashSet<>(quizRepository.findAll());

    }

    @Override
    public Optional<Quiz> getQuiz(Long quizId) {
        return quizRepository.findById(quizId);
    }

    @Override
    public void deleteQuiz(Long quizId) {


     quizRepository.deleteById(quizId);
    }

    @Override
    public Set<Quiz> getQuizzesByCategory(Long categoryId) {
        return quizRepository.findByCategoryCid(categoryId);
    }

    @Override
    public Set<Quiz> getActiveQuizzes() {
        return new HashSet<>( quizRepository.findByActive(true));
    }

    @Override
    public Set<Quiz> getActiveQuizzesOfCategory(Long categoryId) {
        return  quizRepository.findByCategoryCidAndActive(categoryId, true);
    }

    @Override
    public UserQuiz saveUserQuiz(String username, Long quizId, int marksEarned) throws QuizNotFoundException, UserNotFoundException {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if(userOpt.isPresent()) {
        	System.out.println("profile user");
        	User user = userOpt.get();
            Optional<Quiz> quizOpt =  getQuiz(quizId);
            if(quizOpt.isPresent()) {
            	Quiz quiz = quizOpt.get();
                UserQuiz userQuiz = new UserQuiz();
                userQuiz.setUser(user);
                userQuiz.setQuiz(quiz);
                userQuiz.setMarksEarned(marksEarned);
                userQuiz.setAttemptDate(LocalDateTime.now());
                return userQuizRepository.save(userQuiz);
            }else {
            	throw new QuizNotFoundException();
            }
        }else {
        	throw new UserNotFoundException();
        }
    }
}
