-- Users table
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       avatar_url VARCHAR(255),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            user_id BIGINT NOT NULL,
                            name VARCHAR(100) NOT NULL,
                            color VARCHAR(7) NOT NULL,
                            icon VARCHAR(50),
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tasks table
CREATE TABLE tasks (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       user_id BIGINT NOT NULL,
                       category_id BIGINT,
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       completed BOOLEAN DEFAULT FALSE,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                       FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Timer Sessions table
CREATE TABLE timer_sessions (
                                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                user_id BIGINT NOT NULL,
                                task_id BIGINT,
                                session_type VARCHAR(20) NOT NULL,
                                duration_minutes INT NOT NULL,
                                completed BOOLEAN DEFAULT FALSE,
                                started_at TIMESTAMP NOT NULL,
                                completed_at TIMESTAMP NULL,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE SET NULL
);

-- User Stats table
CREATE TABLE user_stats (
                            user_id BIGINT PRIMARY KEY,
                            total_focus_minutes INT DEFAULT 0,
                            total_sessions INT DEFAULT 0,
                            current_streak INT DEFAULT 0,
                            longest_streak INT DEFAULT 0,
                            level INT DEFAULT 1,
                            experience_points INT DEFAULT 0,
                            last_session_date DATE,
                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Achievements table
CREATE TABLE achievements (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              name VARCHAR(100) NOT NULL,
                              description TEXT,
                              icon VARCHAR(50),
                              requirement_type VARCHAR(50) NOT NULL,
                              requirement_value INT NOT NULL
);

-- User Achievements table
CREATE TABLE user_achievements (
                                   user_id BIGINT,
                                   achievement_id BIGINT,
                                   unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                   PRIMARY KEY (user_id, achievement_id),
                                   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                   FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
);