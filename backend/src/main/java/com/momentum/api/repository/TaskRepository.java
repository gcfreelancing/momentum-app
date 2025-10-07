package com.momentum.api.repository;

import com.momentum.api.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Task> findByUserIdAndCompletedOrderByCreatedAtDesc(Long userId, Boolean completed);
    List<Task> findByUserIdAndCategoryIdOrderByCreatedAtDesc(Long userId, Long categoryId);
}