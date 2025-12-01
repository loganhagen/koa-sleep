import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed process...");
  await prisma.users.deleteMany({});
  console.log("🗑️  Deleted all existing users and their related data.");
  const user = await prisma.users.create({
    data: {
      email: "demo@koa",
      full_name: "Koa Sleep",
      display_name: "KoaSleep",
      first_name: "Koa",
      last_name: "Sleep",
    },
  });
  console.log(`👤 Created user '${user.first_name}' with id: ${user.id}`);
  console.log("📊 Seeding biometric and sleep data for 14 days...");

  await prisma.sleep_logs.createMany({
    data: [
      {
        user_id: user.id,
        date: new Date("2025-08-18"),
        bed_time: new Date("2025-08-17T23:50:00Z"),
        wake_time: new Date("2025-08-18T06:30:00Z"),
        duration_ms: 24000000,
        efficiency: 86,
        awake_mins: 65,
        light_mins: 220,
        deep_mins: 55,
        rem_mins: 90,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-19"),
        bed_time: new Date("2025-08-18T22:30:00Z"),
        wake_time: new Date("2025-08-19T06:45:00Z"),
        duration_ms: 29700000,
        efficiency: 95,
        awake_mins: 30,
        light_mins: 270,
        deep_mins: 85,
        rem_mins: 110,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-20"),
        bed_time: new Date("2025-08-19T22:45:00Z"),
        wake_time: new Date("2025-08-20T07:00:00Z"),
        duration_ms: 29700000,
        efficiency: 94,
        awake_mins: 35,
        light_mins: 265,
        deep_mins: 90,
        rem_mins: 105,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-21"),
        bed_time: new Date("2025-08-20T23:30:00Z"),
        wake_time: new Date("2025-08-21T06:15:00Z"),
        duration_ms: 24300000,
        efficiency: 88,
        awake_mins: 55,
        light_mins: 215,
        deep_mins: 60,
        rem_mins: 95,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-22"),
        bed_time: new Date("2025-08-21T22:55:00Z"),
        wake_time: new Date("2025-08-22T06:55:00Z"),
        duration_ms: 28800000,
        efficiency: 96,
        awake_mins: 28,
        light_mins: 255,
        deep_mins: 80,
        rem_mins: 117,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-23"),
        bed_time: new Date("2025-08-22T23:00:00Z"),
        wake_time: new Date("2025-08-23T07:10:00Z"),
        duration_ms: 29400000,
        efficiency: 93,
        awake_mins: 39,
        light_mins: 260,
        deep_mins: 78,
        rem_mins: 113,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-24"),
        bed_time: new Date("2025-08-23T23:10:00Z"),
        wake_time: new Date("2025-08-24T06:00:00Z"),
        duration_ms: 24600000,
        efficiency: 85,
        awake_mins: 62,
        light_mins: 225,
        deep_mins: 58,
        rem_mins: 85,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-25"),
        bed_time: new Date("2025-08-24T22:50:00Z"),
        wake_time: new Date("2025-08-25T06:20:00Z"),
        duration_ms: 27000000,
        efficiency: 90,
        awake_mins: 50,
        light_mins: 230,
        deep_mins: 80,
        rem_mins: 90,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-26"),
        bed_time: new Date("2025-08-25T23:00:00Z"),
        wake_time: new Date("2025-08-26T07:00:00Z"),
        duration_ms: 28800000,
        efficiency: 94,
        awake_mins: 30,
        light_mins: 260,
        deep_mins: 75,
        rem_mins: 115,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-27"),
        bed_time: new Date("2025-08-26T22:30:00Z"),
        wake_time: new Date("2025-08-27T06:15:00Z"),
        duration_ms: 27900000,
        efficiency: 96,
        awake_mins: 25,
        light_mins: 250,
        deep_mins: 70,
        rem_mins: 120,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-28"),
        bed_time: new Date("2025-08-27T23:15:00Z"),
        wake_time: new Date("2025-08-28T07:00:00Z"),
        duration_ms: 27900000,
        efficiency: 88,
        awake_mins: 58,
        light_mins: 245,
        deep_mins: 60,
        rem_mins: 102,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-29"),
        bed_time: new Date("2025-08-28T22:55:00Z"),
        wake_time: new Date("2025-08-29T06:45:00Z"),
        duration_ms: 28200000,
        efficiency: 93,
        awake_mins: 40,
        light_mins: 240,
        deep_mins: 95,
        rem_mins: 95,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-30"),
        bed_time: new Date("2025-08-29T23:10:00Z"),
        wake_time: new Date("2025-08-30T06:00:00Z"),
        duration_ms: 24600000,
        efficiency: 85,
        awake_mins: 62,
        light_mins: 225,
        deep_mins: 58,
        rem_mins: 85,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-31"),
        bed_time: new Date("2025-08-30T22:45:00Z"),
        wake_time: new Date("2025-08-31T06:30:00Z"),
        duration_ms: 27900000,
        efficiency: 92,
        awake_mins: 45,
        light_mins: 250,
        deep_mins: 65,
        rem_mins: 105,
      },
    ],
  });

  await prisma.skin_temperatures.createMany({
    data: [
      { user_id: user.id, date: new Date("2025-08-18"), average: 1.0 },
      { user_id: user.id, date: new Date("2025-08-19"), average: 0.2 },
      { user_id: user.id, date: new Date("2025-08-20"), average: -0.1 },
      { user_id: user.id, date: new Date("2025-08-21"), average: -1.1 },
      { user_id: user.id, date: new Date("2025-08-22"), average: 0.4 },
      { user_id: user.id, date: new Date("2025-08-23"), average: 0.1 },
      { user_id: user.id, date: new Date("2025-08-24"), average: 0.9 },
      { user_id: user.id, date: new Date("2025-08-25"), average: 0.2 },
      { user_id: user.id, date: new Date("2025-08-26"), average: -0.5 },
      { user_id: user.id, date: new Date("2025-08-27"), average: 0.0 },
      { user_id: user.id, date: new Date("2025-08-28"), average: -1.2 },
      { user_id: user.id, date: new Date("2025-08-29"), average: 0.3 },
      { user_id: user.id, date: new Date("2025-08-30"), average: 0.9 },
      { user_id: user.id, date: new Date("2025-08-31"), average: -0.4 },
    ],
  });

  await prisma.breathing_rates.createMany({
    data: [
      { user_id: user.id, date: new Date("2025-08-18"), breathing_rate: 16.4 },
      { user_id: user.id, date: new Date("2025-08-19"), breathing_rate: 15.5 },
      { user_id: user.id, date: new Date("2025-08-20"), breathing_rate: 15.3 },
      { user_id: user.id, date: new Date("2025-08-21"), breathing_rate: 16.2 },
      { user_id: user.id, date: new Date("2025-08-22"), breathing_rate: 15.1 },
      { user_id: user.id, date: new Date("2025-08-23"), breathing_rate: 15.4 },
      { user_id: user.id, date: new Date("2025-08-24"), breathing_rate: 16.5 },
      { user_id: user.id, date: new Date("2025-08-25"), breathing_rate: 16.3 },
      { user_id: user.id, date: new Date("2025-08-26"), breathing_rate: 15.6 },
      { user_id: user.id, date: new Date("2025-08-27"), breathing_rate: 15.4 },
      { user_id: user.id, date: new Date("2025-08-28"), breathing_rate: 16.4 },
      { user_id: user.id, date: new Date("2025-08-29"), breathing_rate: 16.1 },
      { user_id: user.id, date: new Date("2025-08-30"), breathing_rate: 16.5 },
      { user_id: user.id, date: new Date("2025-08-31"), breathing_rate: 15.7 },
    ],
  });

  await prisma.heart_rate_variabilities.createMany({
    data: [
      {
        user_id: user.id,
        date: new Date("2025-08-18"),
        daily_rmssd: 43.1,
        deep_rmssd: 49.5,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-19"),
        daily_rmssd: 58.9,
        deep_rmssd: 66.2,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-20"),
        daily_rmssd: 59.5,
        deep_rmssd: 67.0,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-21"),
        daily_rmssd: 44.5,
        deep_rmssd: 50.1,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-22"),
        daily_rmssd: 61.2,
        deep_rmssd: 69.0,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-23"),
        daily_rmssd: 57.3,
        deep_rmssd: 64.8,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-24"),
        daily_rmssd: 42.0,
        deep_rmssd: 48.8,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-25"),
        daily_rmssd: 53.4,
        deep_rmssd: 60.1,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-26"),
        daily_rmssd: 58.2,
        deep_rmssd: 65.0,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-27"),
        daily_rmssd: 60.1,
        deep_rmssd: 68.3,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-28"),
        daily_rmssd: 41.5,
        deep_rmssd: 48.2,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-29"),
        daily_rmssd: 51.0,
        deep_rmssd: 58.5,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-30"),
        daily_rmssd: 42.0,
        deep_rmssd: 48.8,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-31"),
        daily_rmssd: 48.2,
        deep_rmssd: 55.9,
      },
    ],
  });

  await prisma.spo2_readings.createMany({
    data: [
      {
        user_id: user.id,
        date: new Date("2025-08-18"),
        avg: 94,
        min: 90,
        max: 98,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-19"),
        avg: 97,
        min: 94,
        max: 100,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-20"),
        avg: 98,
        min: 95,
        max: 100,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-21"),
        avg: 95,
        min: 91,
        max: 99,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-22"),
        avg: 97,
        min: 94,
        max: 99,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-23"),
        avg: 96,
        min: 93,
        max: 100,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-24"),
        avg: 94,
        min: 90,
        max: 97,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-25"),
        avg: 97,
        min: 95,
        max: 100,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-26"),
        avg: 96,
        min: 93,
        max: 99,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-27"),
        avg: 97,
        min: 94,
        max: 100,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-28"),
        avg: 95,
        min: 91,
        max: 98,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-29"),
        avg: 96,
        min: 92,
        max: 99,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-30"),
        avg: 94,
        min: 90,
        max: 97,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-31"),
        avg: 96,
        min: 93,
        max: 99,
      },
    ],
  });

  await prisma.smart_summary.createMany({
    data: [
      {
        user_id: user.id,
        date: new Date("2025-08-27"),
        summary:
          "You had an excellent night of restorative sleep. Your total time of 7 hours and 45 minutes combined with an outstanding 96% efficiency score indicates very high-quality rest. You achieved healthy amounts of both deep and REM sleep, which are vital for physical repair and mental clarity. Your vital signs, including a strong Heart Rate Variability (HRV) and stable breathing rate, suggest your nervous system recovered well overnight. All other health metrics appear stable and within a healthy range.",
      },
      {
        user_id: user.id,
        date: new Date("2025-08-28"),
        summary:
          "You had a decent night of rest, though your sleep efficiency of 88% was impacted by nearly an hour of awake time. On the positive side, you achieved healthy amounts of both deep and REM sleep, which are essential for physical repair and cognitive function. A notable highlight is the significant drop in your skin temperature; this cooling is a key physiological trigger for high-quality, restorative sleep. Your breathing rate, HRV, and SpO2 levels all appear stable.",
      },
      {
        user_id: user.id,
        date: new Date("2025-08-29"),
        summary:
          "You had an excellent night's rest. Your total sleep duration of 7 hours and 50 minutes, combined with a high efficiency score of 93%, indicates very restorative sleep. You spent a significant amount of time in both deep and REM sleep, which are crucial for physical recovery and mental processing. Your health metrics all appear stable. The slight rise in your skin temperature is not a concern given your other strong results, but be aware that a cooler environment can sometimes enhance sleep quality even further.",
      },
      {
        user_id: user.id,
        date: new Date("2025-08-30"),
        summary:
          "Your sleep last night was a bit restless. While you achieved respectable amounts of deep and REM sleep, your overall efficiency was lowered by over an hour of awake time. A key insight is your elevated skin temperature; this increase can sometimes interfere with sleep quality and might suggest your sleeping environment was too warm. Your other metrics, including your blood oxygen and HRV, fall within a range that suggests your body was managing okay despite the restlessness.",
      },
      {
        user_id: user.id,
        date: new Date("2025-08-31"),
        summary:
          "You achieved a highly restorative night's rest. Your total sleep time of 7 hours and 45 minutes, paired with an excellent 92% efficiency score, indicates very effective sleep. You spent healthy amounts of time in both deep and REM sleep, which are crucial for physical recovery and memory consolidation. Notably, the slight drop in your skin temperature is a positive sign; this cooling process is a key physiological trigger for deep, quality sleep. Your other health metrics all appear stable and healthy.",
      },
    ],
  });

  console.log("✅ Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ An error occurred while seeding the database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
