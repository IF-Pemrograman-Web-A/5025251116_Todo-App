CREATE DATABASE IF NOT EXISTS todo_db;
USE todo_db;

CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('personal', 'shared') NOT NULL DEFAULT 'personal',
    name VARCHAR(255) NOT NULL,
    date DATE,
    time TIME,
    description TEXT,
    photo_path VARCHAR(255),
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (type, name, date, time, description) VALUES
('personal', 'pehape', '2026-10-10', '19:00:00', 'Belajar PHP'),
('shared', 'ETS', '2026-10-12', '14:00:00', 'Siap-siap memasak');