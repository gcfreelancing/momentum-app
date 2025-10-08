package com.momentum.api.controller;

import com.momentum.api.entities.TimerSession;
import com.momentum.api.repository.TimerSessionRepository;
import com.momentum.api.repository.UserRepository;
import com.momentum.api.repository.TaskRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/timer")
@CrossOrigin(origins = "http://localhost:5173")
public class TimerController {

    @Autowired
    private TimerSessionRepository timerSessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    // POST start timer session
    @PostMapping("/start")
    public ResponseEntity<TimerSession> startSession(@Valid @RequestBody TimerSession session) {
        var user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("User not found"));

        session.setUser(user);
        session.setStartedAt(LocalDateTime.now());
        session.setCompleted(false);

        // Se tem taskId, associa a task
        if (session.getTask() != null && session.getTask().getId() != null) {
            var task = taskRepository.findById(session.getTask().getId()).orElse(null);
            session.setTask(task);
        }

        TimerSession savedSession = timerSessionRepository.save(session);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSession);
    }

    // PATCH complete timer session
    @PatchMapping("/{id}/complete")
    public ResponseEntity<TimerSession> completeSession(@PathVariable Long id) {
        return timerSessionRepository.findById(id)
                .map(session -> {
                    session.setCompleted(true);
                    session.setCompletedAt(LocalDateTime.now());

                    TimerSession updatedSession = timerSessionRepository.save(session);
                    return ResponseEntity.ok(updatedSession);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // GET all sessions for user
    @GetMapping("/sessions")
    public ResponseEntity<List<TimerSession>> getAllSessions() {
        List<TimerSession> sessions = timerSessionRepository.findByUserIdOrderByStartedAtDesc(1L);
        return ResponseEntity.ok(sessions);
    }

    // GET today's sessions
    @GetMapping("/sessions/today")
    public ResponseEntity<List<TimerSession>> getTodaySessions() {
        LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay();
        List<TimerSession> sessions = timerSessionRepository.findByUserIdAndStartedAtAfter(1L, startOfDay);
        return ResponseEntity.ok(sessions);
    }

    // GET session by ID
    @GetMapping("/sessions/{id}")
    public ResponseEntity<TimerSession> getSessionById(@PathVariable Long id) {
        return timerSessionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}