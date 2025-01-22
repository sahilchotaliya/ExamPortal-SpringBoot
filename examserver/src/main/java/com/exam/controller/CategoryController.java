package com.exam.controller;

import com.exam.exception.CategoryNotFoundException;
import com.exam.exception.CategoryNotSavedException;
import com.exam.model.exam.Category;
import com.exam.repo.CategoryRepository;
import com.exam.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

	private CategoryService categoryService;
	private CategoryRepository categoryRepo;
	
	CategoryController(CategoryService categoryService , CategoryRepository categoryRepo){
		this.categoryService = categoryService;
		this.categoryRepo = categoryRepo;
	}

    // Add a new category
    @PostMapping("/")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category category1 = categoryService.addCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(category1);
    }

    // Update an existing category
    @PutMapping("/")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        Category updatedCategory = categoryService.upateCategory(category);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(updatedCategory);
    }

    // Get all categories
    @GetMapping("/")
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(categoryService.getCategories());
    }

    // Get a specific category by ID
    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable Long categoryId) throws CategoryNotFoundException{
    	return categoryService.geCategory(categoryId).orElseThrow(CategoryNotFoundException::new);
    }

    // Delete a category
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
    	Optional<Category> categoryOpt = categoryRepo.findById(categoryId);
    	categoryOpt.ifPresent(categoryRepo::delete);
        return ResponseEntity.noContent().build();
    }
}
