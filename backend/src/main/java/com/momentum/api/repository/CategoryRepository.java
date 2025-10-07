package com.momentum.api.repository;

import com.momentum.api.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUserIdOrderByCreatedAtAsc(Long userId);
}