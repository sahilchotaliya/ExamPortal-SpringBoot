package com.exam.exception;

public class CategoryNotUpdatedException extends RuntimeException{
	public CategoryNotUpdatedException() {
		super("Category could not be update in Database !!");
	}
}
