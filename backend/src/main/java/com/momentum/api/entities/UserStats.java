package com.momentum.api.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "user_stats")
@Data
@NoArgsConstructor
public class UserStats {
    @Id
    @Column(name = "user_id")
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "total_focus_minutes")
    private Integer totalFocusMinutes = 0;

    @Column(name = "total_sessions")
    private Integer totalSessions = 0;

    @Column(name = "current_streak")
    private Integer currentStreak = 0;

    @Column(name = "longest_streak")
    private Integer longestStreak = 0;

    @Column(nullable = false)
    private Integer level = 1;

    @Column(name = "experience_points")
    private Integer experiencePoints = 0;

    @Column(name = "last_session_date")
    private LocalDate lastSessionDate;
}