package com.momentum.api.controller;

import com.momentum.api.entities.Category;
import com.momentum.api.entities.Task;
import com.momentum.api.repository.CategoryRepository;
import com.momentum.api.repository.UserRepository;
import com.momentum.api.repository.TaskRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    private final UserRepository userRepository;

    private final TaskRepository taskRepository;

    public CategoryController(CategoryRepository categoryRepository, UserRepository userRepository, TaskRepository taskRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    // GET all categories for user
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findByUserIdOrderByCreatedAtAsc(1L);
        return ResponseEntity.ok(categories);
    }

    // GET category by ID
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST create new category
    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) {
        var user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("User not found"));

        category.setUser(user);
        Category savedCategory = categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    // PUT update category
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @Valid @RequestBody Category categoryDetails) {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setName(categoryDetails.getName());
                    category.setColor(categoryDetails.getColor());
                    category.setIcon(categoryDetails.getIcon());
                    Category updatedCategory = categoryRepository.save(category);
                    return ResponseEntity.ok(updatedCategory);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE category
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        // Check if category has tasks
        List<Task> tasksWithCategory = taskRepository.findByUserIdAndCategoryIdOrderByCreatedAtDesc(1L, id);

        if (!tasksWithCategory.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Conflict
        }

        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}