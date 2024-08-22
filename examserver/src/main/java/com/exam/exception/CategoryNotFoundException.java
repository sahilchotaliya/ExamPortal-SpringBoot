package com.exam.exception;

public class CategoryNotFoundException extends RuntimeException{
	public CategoryNotFoundException() {
		super("Category not Found !!");
	}
}
