 package com.exam.controller;

import com.exam.exception.QuizNotFoundException;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.services.QuestionService;
import com.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    // Add a new question
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    // Update an existing question
    @PutMapping("/{quesId}")
    public ResponseEntity<Question> updateQuestion(@PathVariable("quesId") Long quesId, @RequestBody Question question) {
        question.setQuesId(quesId);
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }


    // Get all questions
    @GetMapping("/")
    public ResponseEntity<List<Question>> getQuestions() {
        List<Question> questions = new ArrayList<>(questionService.getQuestions());
        return ResponseEntity.ok(questions);
    }

    // Get a single question by ID
    @GetMapping("/{quesId}")
    public ResponseEntity<Question> getQuestion(@PathVariable("quesId") Long quesId) {
        Optional<Question> questionOpt = questionService.getQuestion(quesId);
        	return questionOpt.map(ResponseEntity::ok)
        			.orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
//        	return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

	// Get all questions of a specific quiz
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) throws QuizNotFoundException {
		Optional<Quiz> quizOpt = quizService.getQuiz(qid);
		if (quizOpt.isPresent()) {
			Quiz quiz = quizOpt.get();
			Set<Question> questions = quiz.getQuestions();
			List<Question> list = new ArrayList<>(questions);
			if (list.size() > Integer.parseInt(quiz.getNumberOfQuestion())) {
				list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestion()));
			}
			Collections.shuffle(list);
			return ResponseEntity.ok(list);
		} else {
			throw new QuizNotFoundException();
		}

	}

    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
      Quiz quiz = new Quiz();
      quiz.setQid(qid);
      Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
      return ResponseEntity.ok(questionsOfQuiz);
    }

    // Delete a question by ID
    @DeleteMapping("/{questionId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
        return ResponseEntity.ok().build();
    }
}
