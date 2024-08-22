package com.exam.services.impl;

import com.exam.exception.CategoryNotSavedException;
import com.exam.exception.CategoryNotUpdatedException;
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

    private CategoryRepository categoryRepository;
    
    CategoryServiceImpl(CategoryRepository categoryRepository){
    	this.categoryRepository = categoryRepository;
    }

    @Override
    public Category addCategory(Category category) throws CategoryNotSavedException{
    	try {
			return categoryRepository.save(category);
		} catch (Exception e) {
			throw new CategoryNotSavedException();
		}
    }

    @Override
    public Category upateCategory(Category category) throws CategoryNotUpdatedException{
    	try {
    		 return categoryRepository.save(category);
		} catch (Exception e) {
			throw new CategoryNotUpdatedException();
		}
    }

    @Override
    public Set<Category> getCategories() {
      return new LinkedHashSet<>(categoryRepository.findAll());
    }

    @Override
    public Optional<Category> geCategory(long categoryId) {
        return categoryRepository.findById(categoryId);
    }

    @Override
    public void deleteCategory(Long categoryId) {

        Category category = new Category();
        category.setCid(categoryId); // Assuming there's a setter for CID
        categoryRepository.delete(category);
    }
}
