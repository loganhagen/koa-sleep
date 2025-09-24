-- ====================================================================
-- Koa Sleep Development Seed Script 
-- ====================================================================

TRUNCATE users RESTART IDENTITY CASCADE;

DO $$
DECLARE
  new_user_id UUID;
BEGIN
  INSERT INTO users (email, first_name, last_name, created_at, updated_at)
  VALUES
  (
    'demo@koa',
    'Koa',
    'Sleep',
    NOW(),
    NOW()
  )
  RETURNING id INTO new_user_id;


  -- Insert 7 days of sleep logs
  INSERT INTO sleep_logs (user_id, date, bed_time, wake_time, duration_ms, efficiency, awake_mins, light_mins, deep_mins, rem_mins)
  VALUES 
    (new_user_id, '2025-08-31', '2025-08-30T22:45:00Z', '2025-08-31T06:30:00Z', 27900000, 92, 45, 250, 65, 105),
    (new_user_id, '2025-08-30', '2025-08-29T23:05:00Z', '2025-08-30T07:15:00Z', 29400000, 95, 38, 260, 80, 110),
    (new_user_id, '2025-08-29', '2025-08-28T22:55:00Z', '2025-08-29T06:45:00Z', 28200000, 93, 40, 240, 95, 95),
    (new_user_id, '2025-08-28', '2025-08-27T23:15:00Z', '2025-08-28T07:00:00Z', 27900000, 91, 50, 245, 70, 100),
    (new_user_id, '2025-08-27', '2025-08-26T22:30:00Z', '2025-08-27T06:15:00Z', 27900000, 96, 25, 250, 70, 120),
    (new_user_id, '2025-08-26', '2025-08-25T23:00:00Z', '2025-08-26T07:00:00Z', 28800000, 94, 30, 260, 75, 115),
    (new_user_id, '2025-08-25', '2025-08-24T22:50:00Z', '2025-08-25T06:20:00Z', 27000000, 90, 50, 230, 80, 90);

  -- Insert 7 days of skin temperatures
  INSERT INTO skin_temperatures (user_id, date, average) 
  VALUES 
    (new_user_id, '2025-08-31', -0.4),
    (new_user_id, '2025-08-30', 0.1),
    (new_user_id, '2025-08-29', 0.3),
    (new_user_id, '2025-08-28', -0.8),
    (new_user_id, '2025-08-27', 0.0),
    (new_user_id, '2025-08-26', -0.5),
    (new_user_id, '2025-08-25', 0.2);

  -- Insert 7 days of breathing rates
  INSERT INTO breathing_rates (user_id, date, breathing_rate) 
  VALUES 
    (new_user_id, '2025-08-31', 15.7),
    (new_user_id, '2025-08-30', 15.2),
    (new_user_id, '2025-08-29', 16.1),
    (new_user_id, '2025-08-28', 15.9),
    (new_user_id, '2025-08-27', 15.4),
    (new_user_id, '2025-08-26', 15.6),
    (new_user_id, '2025-08-25', 16.3);

  -- Insert 7 days of heart rate variabilities
  INSERT INTO heart_rate_variabilities (user_id, date, daily_rmssd, deep_rmssd) 
  VALUES 
    (new_user_id, '2025-08-31', 48.2, 55.9),
    (new_user_id, '2025-08-30', 55.6, 62.1),
    (new_user_id, '2025-08-29', 51.0, 58.5),
    (new_user_id, '2025-08-28', 45.3, 51.7),
    (new_user_id, '2025-08-27', 60.1, 68.3),
    (new_user_id, '2025-08-26', 58.2, 65.0),
    (new_user_id, '2025-08-25', 53.4, 60.1);

  -- Insert 7 days of spo2 readings
  INSERT INTO spo2_readings (user_id, date, avg, min, max) 
  VALUES 
    (new_user_id, '2025-08-31', 96, 93, 99),
    (new_user_id, '2025-08-30', 97, 94, 100),
    (new_user_id, '2025-08-29', 96, 92, 99),
    (new_user_id, '2025-08-28', 95, 91, 98),
    (new_user_id, '2025-08-27', 97, 94, 100),
    (new_user_id, '2025-08-26', 96, 93, 99),
    (new_user_id, '2025-08-25', 97, 95, 100);

END $$;