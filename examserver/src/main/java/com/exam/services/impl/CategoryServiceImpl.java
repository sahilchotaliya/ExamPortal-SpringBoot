package com.exam.services.impl;

import com.exam.model.exam.Category;
import com.exam.repo.CategoryRepository;
import com.exam.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;



    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category upateCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Set<Category> getCategories() {
      return new LinkedHashSet<>(this.categoryRepository.findAll());
    }

    @Override
    public Category geCategory(long categoryId) {
          Optional<Category> category = this.categoryRepository.findById(categoryId);
        return category.orElse(null);
    }

    @Override
    public void deleteCategory(Long categoryId) {

        Category category = new Category();
        category.setCid(categoryId); // Assuming there's a setter for CID
        this.categoryRepository.delete(category);
    }
}
