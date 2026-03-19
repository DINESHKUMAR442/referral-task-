-- Seed file for referral_db
USE referral_db;

-- Clear existing data (CAUTION: Removes all users and positions)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE referral_relationships;
TRUNCATE TABLE tree_positions;
TRUNCATE TABLE users;
TRUNCATE TABLE global_placement_state;
SET FOREIGN_KEY_CHECKS = 1;

-- Initialize global state
INSERT INTO global_placement_state (id, last_filled_user_id, next_position_index) 
VALUES (1, NULL, 0);

-- Create Root User
-- Password is 'password' (BCrypt hashed)
INSERT INTO users (id, uid, username, password_hash, created_at)
VALUES (1, 'ROOT001', 'admin', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.TVuHOn2', CURRENT_TIMESTAMP);

-- Create Root Tree Position
INSERT INTO tree_positions (user_id, parent_id, position_name, level, created_at)
VALUES (1, NULL, NULL, 0, CURRENT_TIMESTAMP);

-- Log completion
SELECT 'Database seeded successfully with Root User (ROOT001/admin)' AS message;
