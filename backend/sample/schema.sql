-- ====================================================================
-- Koa Sleep Schema Definition 
-- ====================================================================

-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the sleep_logs table
CREATE TABLE sleep_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    bed_time TIMESTAMPTZ NOT NULL,
    wake_time TIMESTAMPTZ NOT NULL,
    duration_ms BIGINT NOT NULL CHECK (duration_ms >= 0),
    efficiency INTEGER NOT NULL CHECK (efficiency >= 0 AND efficiency <= 100), 
    awake_mins INTEGER NOT NULL CHECK (awake_mins >= 0),
    light_mins INTEGER NOT NULL CHECK (light_mins >= 0),
    deep_mins INTEGER NOT NULL CHECK (deep_mins >= 0),
    rem_mins INTEGER NOT NULL CHECK (rem_mins >= 0),
    UNIQUE (user_id, date)
);

-- Create the skin_temperatures table
CREATE TABLE skin_temperatures (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    average FLOAT NOT NULL,
    UNIQUE (user_id, date)
);

-- Create the breathing_rates table
CREATE TABLE breathing_rates (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    breathing_rate FLOAT NOT NULL CHECK (breathing_rate > 0),
    UNIQUE (user_id, date)
);

-- Create the heart_rate_variabilities table
CREATE TABLE heart_rate_variabilities (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    daily_rmssd FLOAT NOT NULL CHECK (daily_rmssd > 0),
    deep_rmssd FLOAT NOT NULL CHECK (deep_rmssd > 0),
    UNIQUE (user_id, date)
);

-- Create the spo2_readings table
CREATE TABLE spo2_readings (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    avg INTEGER NOT NULL CHECK (avg >= 0 AND avg <= 100),
    min INTEGER NOT NULL CHECK (min >= 0 AND min <= 100),
    max INTEGER NOT NULL CHECK (max >= 0 AND max <= 100),
    UNIQUE (user_id, date)
);

-- Create indexes for faster lookups on foreign keys and dates
CREATE INDEX ON sleep_logs (user_id, date);
CREATE INDEX ON skin_temperatures (user_id, date);
CREATE INDEX ON breathing_rates (user_id, date);
CREATE INDEX ON heart_rate_variabilities (user_id, date);
CREATE INDEX ON spo2_readings (user_id, date);