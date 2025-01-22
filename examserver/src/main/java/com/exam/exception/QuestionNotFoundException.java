package com.exam.exception;

public class QuestionNotFoundException extends RuntimeException{
	QuestionNotFoundException(){
		super("Question Not Found !!");
	}
}
