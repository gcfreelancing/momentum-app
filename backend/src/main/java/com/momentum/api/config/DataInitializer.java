package com.momentum.api.config;

import com.momentum.api.entities.User;
import com.momentum.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@AllArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            String email = "demo@momentum.com";
            String rawPassword = "demo123";

            System.out.println("=== INITIALIZING DEMO USER ===");

            User demoUser = userRepository.findByEmail(email).orElse(null);

            if (demoUser == null) {
                demoUser = new User();
                System.out.println("🆕 Creating new demo user");
            } else {
                System.out.println("🔄 Updating existing demo user");
            }

            // Always update password to ensure it's correct
            String hashedPassword = passwordEncoder.encode(rawPassword);

            demoUser.setUsername("demo");
            demoUser.setEmail(email);
            demoUser.setPassword(hashedPassword);
        };
    }
}