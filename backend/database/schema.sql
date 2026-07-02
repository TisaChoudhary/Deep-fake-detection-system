-- Database Schema for Deep Fake Detection System
-- PostgreSQL database schema

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Detection History Table
CREATE TABLE IF NOT EXISTS detection_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- 'image' or 'video'
    prediction VARCHAR(50) NOT NULL, -- 'Real' or 'Fake'
    confidence DECIMAL(5, 2) NOT NULL,
    processing_time DECIMAL(10, 2) NOT NULL,
    heatmap_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    detection_id INTEGER NOT NULL REFERENCES detection_history(id) ON DELETE CASCADE,
    report_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_detection_user_id ON detection_history(user_id);
CREATE INDEX idx_detection_created_at ON detection_history(created_at);
CREATE INDEX idx_reports_user_id ON reports(user_id);
