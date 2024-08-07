package com.exam.services;

import com.exam.model.exam.Category;

import java.util.Set;

public interface CategoryService {
    public Category addCategory(Category category);
    public Category upateCategory(Category category);
    public Set<Category> getCategories();
    public Category geCategory(long categoryId);

    public  void deleteCategory(Long categoryId);



}
