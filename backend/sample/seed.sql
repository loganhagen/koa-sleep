-- ====================================================================
-- FitSync Development Seed Script
-- ====================================================================
-- This script will wipe all existing data and insert a fresh set
-- of sample records for development and testing purposes.
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

  INSERT INTO "Connection" ("provider", "providerAccountId", "createdAt", "updatedAt", "userId")
  VALUES
  (
    'FITBIT',
    '987ZYX',
    NOW(),
    NOW(),
    new_user_id
  );

  -- Day 1 (Most Recent)
  INSERT INTO "SleepLog" ("fitbitLogId", "userId", "dateOfSleep", "startTime", "endTime", "duration", "efficiency", "minutesToFallAsleep", "minutesAsleep", "minutesAwake", "timeInBed", "isMainSleep", "type", "infoCode", "levels")
  VALUES
  (
    9876543210, new_user_id, '2025-08-30', '2025-08-30 22:45:00', '2025-08-31 06:30:00', 27900000, 92, 15, 420, 45, 465, true, 'stages', 0, '{"summary": {"rem": {"minutes": 105}, "light": {"minutes": 250}, "deep": {"minutes": 65}}}'
  );
  INSERT INTO "SkinTemperature" ("dateTime", "nightlyRelative", "logType", "userId")
  VALUES
  (
    '2025-08-31 00:00:00', 34.4, 'DEDICATED_TRACKER', new_user_id
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

  -- Day 2
  INSERT INTO "SleepLog" ("fitbitLogId", "userId", "dateOfSleep", "startTime", "endTime", "duration", "efficiency", "minutesToFallAsleep", "minutesAsleep", "minutesAwake", "timeInBed", "isMainSleep", "type", "infoCode", "levels")
  VALUES
  (
    9876543211, new_user_id, '2025-08-29', '2025-08-29 23:05:00', '2025-08-30 07:15:00', 29400000, 95, 12, 450, 38, 490, true, 'stages', 0, '{"summary": {"rem": {"minutes": 110}, "light": {"minutes": 260}, "deep": {"minutes": 80}}}'
  );
  INSERT INTO "SkinTemperature" ("dateTime", "nightlyRelative", "logType", "userId")
  VALUES
  (
    '2025-08-30 00:00:00', 34.8, 'DEDICATED_TRACKER', new_user_id
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


  -- Day 3
  INSERT INTO "SleepLog" ("fitbitLogId", "userId", "dateOfSleep", "startTime", "endTime", "duration", "efficiency", "minutesToFallAsleep", "minutesAsleep", "minutesAwake", "timeInBed", "isMainSleep", "type", "infoCode", "levels")
  VALUES
  (
    9876543212, new_user_id, '2025-08-28', '2025-08-28 22:55:00', '2025-08-29 06:45:00', 28200000, 93, 18, 430, 40, 470, true, 'stages', 0, '{"summary": {"rem": {"minutes": 95}, "light": {"minutes": 240}, "deep": {"minutes": 95}}}'
  );
  INSERT INTO "SkinTemperature" ("dateTime", "nightlyRelative", "logType", "userId")
  VALUES
  (
    '2025-08-29 00:00:00', 35.1, 'DEDICATED_TRACKER', new_user_id
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


  -- Day 4
  INSERT INTO "SleepLog" ("fitbitLogId", "userId", "dateOfSleep", "startTime", "endTime", "duration", "efficiency", "minutesToFallAsleep", "minutesAsleep", "minutesAwake", "timeInBed", "isMainSleep", "type", "infoCode", "levels")
  VALUES
  (
    9876543213, new_user_id, '2025-08-27', '2025-08-27 23:15:00', '2025-08-28 07:00:00', 27900000, 91, 14, 415, 50, 465, true, 'stages', 0, '{"summary": {"rem": {"minutes": 100}, "light": {"minutes": 245}, "deep": {"minutes": 70}}}'
  );
  INSERT INTO "SkinTemperature" ("dateTime", "nightlyRelative", "logType", "userId")
  VALUES
  (
    '2025-08-28 00:00:00', 34, 'DEDICATED_TRACKER', new_user_id
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


  -- Day 5
  INSERT INTO "SleepLog" ("fitbitLogId", "userId", "dateOfSleep", "startTime", "endTime", "duration", "efficiency", "minutesToFallAsleep", "minutesAsleep", "minutesAwake", "timeInBed", "isMainSleep", "type", "infoCode", "levels")
  VALUES
  (
    9876543214, new_user_id, '2025-08-26', '2025-08-26 22:30:00', '2025-08-27 06:15:00', 27900000, 96, 10, 440, 25, 465, true, 'stages', 0, '{"summary": {"rem": {"minutes": 120}, "light": {"minutes": 250}, "deep": {"minutes": 70}}}'
  );
  INSERT INTO "SkinTemperature" ("dateTime", "nightlyRelative", "logType", "userId")
  VALUES
  (
    '2025-08-27 00:00:00', 34.6, 'DEDICATED_TRACKER', new_user_id
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

  -- Day 6
  INSERT INTO "SleepLog" ("fitbitLogId", "userId", "dateOfSleep", "startTime", "endTime", "duration", "efficiency", "minutesToFallAsleep", "minutesAsleep", "minutesAwake", "timeInBed", "isMainSleep", "type", "infoCode", "levels")
  VALUES
  (
    9876543215, new_user_id, '2025-08-25', '2025-08-25 23:00:00', '2025-08-26 07:00:00', 28800000, 94, 20, 450, 30, 480, true, 'stages', 0, '{"summary": {"rem": {"minutes": 115}, "light": {"minutes": 260}, "deep": {"minutes": 75}}}'
  );
  INSERT INTO "SkinTemperature" ("dateTime", "nightlyRelative", "logType", "userId")
  VALUES
  (
    '2025-08-26 00:00:00', 34.3, 'DEDICATED_TRACKER', new_user_id
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

  -- Day 7
  INSERT INTO "SleepLog" ("fitbitLogId", "userId", "dateOfSleep", "startTime", "endTime", "duration", "efficiency", "minutesToFallAsleep", "minutesAsleep", "minutesAwake", "timeInBed", "isMainSleep", "type", "infoCode", "levels")
  VALUES
  (
    9876543216, new_user_id, '2025-08-24', '2025-08-24 22:50:00', '2025-08-25 06:20:00', 27000000, 90, 16, 400, 50, 450, true, 'stages', 0, '{"summary": {"rem": {"minutes": 90}, "light": {"minutes": 230}, "deep": {"minutes": 80}}}'
  );
  INSERT INTO "SkinTemperature" ("dateTime", "nightlyRelative", "logType", "userId")
  VALUES
  (
    '2025-08-25 00:00:00', 34.9, 'DEDICATED_TRACKER', new_user_id
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