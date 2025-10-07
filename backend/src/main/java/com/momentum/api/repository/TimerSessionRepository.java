package com.momentum.api.repository;

import com.momentum.api.entities.TimerSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface TimerSessionRepository extends JpaRepository<TimerSession, Long> {
    List<TimerSession> findByUserIdOrderByStartedAtDesc(Long userId);

    @Query("SELECT t FROM TimerSession t WHERE t.user.id = ?1 AND t.startedAt >= ?2")
    List<TimerSession> findByUserIdAndStartedAtAfter(Long userId, LocalDateTime startDate);
}