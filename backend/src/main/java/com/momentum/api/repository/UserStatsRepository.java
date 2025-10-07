package com.momentum.api.repository;

import com.momentum.api.entities.UserStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface UserStatsRepository extends JpaRepository<UserStats, Long> {

    @Query("SELECT u FROM UserStats u ORDER BY u.experiencePoints DESC")
    List<UserStats> findTopByOrderByExperiencePointsDesc();
}