package com.exam.model.exam;

import com.exam.model.User;
import com.exam.model.exam.Quiz;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_quizzes")
public class UserQuiz {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private int marksEarned;
    private LocalDateTime attemptDate;

    public UserQuiz(Long id, User user, Quiz quiz, int marksEarned, LocalDateTime attemptDate) {
        this.id = id;
        this.user = user;
        this.quiz = quiz;
        this.marksEarned = marksEarned;
        this.attemptDate = attemptDate;
    }

    public UserQuiz() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public int getMarksEarned() {
        return marksEarned;
    }

    public void setMarksEarned(int marksEarned) {
        this.marksEarned = marksEarned;
    }

    public LocalDateTime getAttemptDate() {
        return attemptDate;
    }

    public void setAttemptDate(LocalDateTime attemptDate) {
        this.attemptDate = attemptDate;
    }
}