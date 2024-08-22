package com.exam.exception;

public class QuizNotFoundException extends RuntimeException{
	public QuizNotFoundException(){
		super("Quiz Not Found !!");
	}
}
