-- ====================================================================
-- FitSync Development Seed Script (Updated)
-- ====================================================================
-- This script wipes all existing data and inserts a fresh set
-- of sample records, including the dateTime column for SleepLogs.
-- ====================================================================

TRUNCATE "User" RESTART IDENTITY CASCADE;

DO $$
DECLARE
  new_user_id UUID;
BEGIN
  INSERT INTO "User" ("email", "firstName", "lastName", "createdAt", "updatedAt")
  VALUES
  (
    'mo.sleep@fitsync.com',
    'Mo',
    'Sleep',
    NOW(),
    NOW()
  )
  RETURNING id INTO new_user_id;

  -- Seed 7 days of data for the user

  -- Day 1 (Most Recent: Aug 31st)
  INSERT INTO "SleepLog" ("userId", "dateTime", "bedTime", "wakeTime", "duration", "efficiency", "awakeMins", "lightMins", "deepMins", "remMins")
  VALUES
  (
    new_user_id, '2025-08-31 00:00:00', '2025-08-30 22:45:00', '2025-08-31 06:30:00', 465, 92, 45, 250, 65, 105
  );
  INSERT INTO "SkinTemperature" ("dateTime", "average", "userId")
  VALUES
  (
    '2025-08-31 00:00:00', -0.4, new_user_id
  );
  INSERT INTO "BreathingRate" ("dateTime", "breathingRate", "userId")
  VALUES
  (
    '2025-08-31 00:00:00', 15.7, new_user_id
  );
  INSERT INTO "HeartRateVariability" ("dateTime", "dailyRmssd", "deepRmssd", "userId")
  VALUES
  (
    '2025-08-31 00:00:00', 48.2, 55.9, new_user_id
  );
  INSERT INTO "SpO2" ("dateTime", "avg", "min", "max", "userId")
  VALUES
  (
    '2025-08-31 00:00:00', 96, 93, 99, new_user_id
  );

  -- Day 2 (Aug 30th)
  INSERT INTO "SleepLog" ("userId", "dateTime", "bedTime", "wakeTime", "duration", "efficiency", "awakeMins", "lightMins", "deepMins", "remMins")
  VALUES
  (
    new_user_id, '2025-08-30 00:00:00', '2025-08-29 23:05:00', '2025-08-30 07:15:00', 490, 95, 38, 260, 80, 110
  );
  INSERT INTO "SkinTemperature" ("dateTime", "average", "userId")
  VALUES
  (
    '2025-08-30 00:00:00', 0.1, new_user_id
  );
  INSERT INTO "BreathingRate" ("dateTime", "breathingRate", "userId")
  VALUES
  (
    '2025-08-30 00:00:00', 15.2, new_user_id
  );
  INSERT INTO "HeartRateVariability" ("dateTime", "dailyRmssd", "deepRmssd", "userId")
  VALUES
  (
    '2025-08-30 00:00:00', 55.6, 62.1, new_user_id
  );
  INSERT INTO "SpO2" ("dateTime", "avg", "min", "max", "userId")
  VALUES
  (
    '2025-08-30 00:00:00', 97, 94, 100, new_user_id
  );


  -- Day 3 (Aug 29th)
  INSERT INTO "SleepLog" ("userId", "dateTime", "bedTime", "wakeTime", "duration", "efficiency", "awakeMins", "lightMins", "deepMins", "remMins")
  VALUES
  (
    new_user_id, '2025-08-29 00:00:00', '2025-08-28 22:55:00', '2025-08-29 06:45:00', 470, 93, 40, 240, 95, 95
  );
  INSERT INTO "SkinTemperature" ("dateTime", "average", "userId")
  VALUES
  (
    '2025-08-29 00:00:00', 0.3, new_user_id
  );
  INSERT INTO "BreathingRate" ("dateTime", "breathingRate", "userId")
  VALUES
  (
    '2025-08-29 00:00:00', 16.1, new_user_id
  );
  INSERT INTO "HeartRateVariability" ("dateTime", "dailyRmssd", "deepRmssd", "userId")
  VALUES
  (
    '2025-08-29 00:00:00', 51.0, 58.5, new_user_id
  );
  INSERT INTO "SpO2" ("dateTime", "avg", "min", "max", "userId")
  VALUES
  (
    '2025-08-29 00:00:00', 96, 92, 99, new_user_id
  );


  -- Day 4 (Aug 28th)
  INSERT INTO "SleepLog" ("userId", "dateTime", "bedTime", "wakeTime", "duration", "efficiency", "awakeMins", "lightMins", "deepMins", "remMins")
  VALUES
  (
    new_user_id, '2025-08-28 00:00:00', '2025-08-27 23:15:00', '2025-08-28 07:00:00', 465, 91, 50, 245, 70, 100
  );
  INSERT INTO "SkinTemperature" ("dateTime", "average", "userId")
  VALUES
  (
    '2025-08-28 00:00:00', -0.8, new_user_id
  );
  INSERT INTO "BreathingRate" ("dateTime", "breathingRate", "userId")
  VALUES
  (
    '2025-08-28 00:00:00', 15.9, new_user_id
  );
  INSERT INTO "HeartRateVariability" ("dateTime", "dailyRmssd", "deepRmssd", "userId")
  VALUES
  (
    '2025-08-28 00:00:00', 45.3, 51.7, new_user_id
  );
  INSERT INTO "SpO2" ("dateTime", "avg", "min", "max", "userId")
  VALUES
  (
    '2025-08-28 00:00:00', 95, 91, 98, new_user_id
  );


  -- Day 5 (Aug 27th)
  INSERT INTO "SleepLog" ("userId", "dateTime", "bedTime", "wakeTime", "duration", "efficiency", "awakeMins", "lightMins", "deepMins", "remMins")
  VALUES
  (
    new_user_id, '2025-08-27 00:00:00', '2025-08-26 22:30:00', '2025-08-27 06:15:00', 465, 96, 25, 250, 70, 120
  );
  INSERT INTO "SkinTemperature" ("dateTime", "average", "userId")
  VALUES
  (
    '2025-08-27 00:00:00', 0.0, new_user_id
  );
  INSERT INTO "BreathingRate" ("dateTime", "breathingRate", "userId")
  VALUES
  (
    '2025-08-27 00:00:00', 15.4, new_user_id
  );
  INSERT INTO "HeartRateVariability" ("dateTime", "dailyRmssd", "deepRmssd", "userId")
  VALUES
  (
    '2025-08-27 00:00:00', 60.1, 68.3, new_user_id
  );
  INSERT INTO "SpO2" ("dateTime", "avg", "min", "max", "userId")
  VALUES
  (
    '2025-08-27 00:00:00', 97, 94, 100, new_user_id
  );

  -- Day 6 (Aug 26th)
  INSERT INTO "SleepLog" ("userId", "dateTime", "bedTime", "wakeTime", "duration", "efficiency", "awakeMins", "lightMins", "deepMins", "remMins")
  VALUES
  (
    new_user_id, '2025-08-26 00:00:00', '2025-08-25 23:00:00', '2025-08-26 07:00:00', 480, 94, 30, 260, 75, 115
  );
  INSERT INTO "SkinTemperature" ("dateTime", "average", "userId")
  VALUES
  (
    '2025-08-26 00:00:00', -0.5, new_user_id
  );
  INSERT INTO "BreathingRate" ("dateTime", "breathingRate", "userId")
  VALUES
  (
    '2025-08-26 00:00:00', 15.6, new_user_id
  );
  INSERT INTO "HeartRateVariability" ("dateTime", "dailyRmssd", "deepRmssd", "userId")
  VALUES
  (
    '2025-08-26 00:00:00', 58.2, 65.0, new_user_id
  );
  INSERT INTO "SpO2" ("dateTime", "avg", "min", "max", "userId")
  VALUES
  (
    '2025-08-26 00:00:00', 96, 93, 99, new_user_id
  );

  -- Day 7 (Aug 25th)
  INSERT INTO "SleepLog" ("userId", "dateTime", "bedTime", "wakeTime", "duration", "efficiency", "awakeMins", "lightMins", "deepMins", "remMins")
  VALUES
  (
    new_user_id, '2025-08-25 00:00:00', '2025-08-24 22:50:00', '2025-08-25 06:20:00', 450, 90, 50, 230, 80, 90
  );
  INSERT INTO "SkinTemperature" ("dateTime", "average", "userId")
  VALUES
  (
    '2025-08-25 00:00:00', 0.2, new_user_id
  );
  INSERT INTO "BreathingRate" ("dateTime", "breathingRate", "userId")
  VALUES
  (
    '2025-08-25 00:00:00', 16.3, new_user_id
  );
  INSERT INTO "HeartRateVariability" ("dateTime", "dailyRmssd", "deepRmssd", "userId")
  VALUES
  (
    '2025-08-25 00:00:00', 53.4, 60.1, new_user_id
  );
  INSERT INTO "SpO2" ("dateTime", "avg", "min", "max", "userId")
  VALUES
  (
    '2025-08-25 00:00:00', 97, 95, 100, new_user_id
  );

END $$;