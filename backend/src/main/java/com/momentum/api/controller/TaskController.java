package com.momentum.api.controller;

import com.momentum.api.entities.Task;
import com.momentum.api.repository.TaskRepository;
import com.momentum.api.repository.UserRepository;
import com.momentum.api.repository.CategoryRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // GET all tasks (mock user ID = 1 por agora)
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskRepository.findByUserIdOrderByCreatedAtDesc(1L);
        return ResponseEntity.ok(tasks);
    }

    // GET task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST create new task
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        // Mock user (ID = 1)
        var user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setUser(user);

        // If it has a category, it validates what already exists
        if (task.getCategory() != null && task.getCategory().getId() != null) {
            var category = categoryRepository.findById(task.getCategory().getId())
                    .orElse(null);
            task.setCategory(category);
        }

        Task savedTask = taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    // PUT update task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody Task taskDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(taskDetails.getTitle());
                    task.setDescription(taskDetails.getDescription());
                    task.setCompleted(taskDetails.getCompleted());

                    if (taskDetails.getCategory() != null && taskDetails.getCategory().getId() != null) {
                        // Fetch the full category from the database
                        var category = categoryRepository.findById(taskDetails.getCategory().getId())
                                .orElse(null);
                        task.setCategory(category);
                    } else {
                        // If category is null or has no ID, remove category
                        task.setCategory(null);
                    }

                    Task updatedTask = taskRepository.save(task);
                    return ResponseEntity.ok(updatedTask);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // PATCH toggle task completion
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Task> toggleTask(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setCompleted(!task.getCompleted());
                    Task updatedTask = taskRepository.save(task);
                    return ResponseEntity.ok(updatedTask);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // GET tasks by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Task>> getTasksByCategory(@PathVariable Long categoryId) {
        List<Task> tasks = taskRepository.findByUserIdAndCategoryIdOrderByCreatedAtDesc(1L, categoryId);
        return ResponseEntity.ok(tasks);
    }

    // GET tasks by completion status
    @GetMapping("/status/{completed}")
    public ResponseEntity<List<Task>> getTasksByStatus(@PathVariable Boolean completed) {
        List<Task> tasks = taskRepository.findByUserIdAndCompletedOrderByCreatedAtDesc(1L, completed);
        return ResponseEntity.ok(tasks);
    }
}