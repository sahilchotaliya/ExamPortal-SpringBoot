package com.exam.exception;

public class CategoryNotSavedException extends RuntimeException{
	public CategoryNotSavedException() {
		super("Category could not be saved in Database !!");
	}
}
