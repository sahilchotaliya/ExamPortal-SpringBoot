package com.exam.services;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface QuestionService {
    public  Question addQuestion(Question question);
    public  Question updateQuestion(Question question);
    public  Set<Question> getQuestions();
    public   Question getQuestion(Long quetionId);
    public Set<Question> getQuestionsOfQuiz(Quiz quiz);
    public  void deleteQuestion(Long quesId);
}
