import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed process...");
  await prisma.users.deleteMany({});
  console.log("🗑️  Deleted all existing users and their related data.");
  const user = await prisma.users.create({
    data: {
      email: "demo@koa",
      first_name: "Koa",
      last_name: "Sleep",
    },
  });
  console.log(`👤 Created user '${user.first_name}' with id: ${user.id}`);
  console.log("📊 Seeding biometric and sleep data...");

  await prisma.sleep_logs.createMany({
    data: [
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
      {
        user_id: user.id,
        date: new Date("2025-08-30"),
        bed_time: new Date("2025-08-29T23:05:00Z"),
        wake_time: new Date("2025-08-30T07:15:00Z"),
        duration_ms: 29400000,
        efficiency: 95,
        awake_mins: 38,
        light_mins: 260,
        deep_mins: 80,
        rem_mins: 110,
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
        date: new Date("2025-08-28"),
        bed_time: new Date("2025-08-27T23:15:00Z"),
        wake_time: new Date("2025-08-28T07:00:00Z"),
        duration_ms: 27900000,
        efficiency: 91,
        awake_mins: 50,
        light_mins: 245,
        deep_mins: 70,
        rem_mins: 100,
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
    ],
  });

  await prisma.skin_temperatures.createMany({
    data: [
      { user_id: user.id, date: new Date("2025-08-31"), average: -0.4 },
      { user_id: user.id, date: new Date("2025-08-30"), average: 0.1 },
      { user_id: user.id, date: new Date("2025-08-29"), average: 0.3 },
      { user_id: user.id, date: new Date("2025-08-28"), average: -0.8 },
      { user_id: user.id, date: new Date("2025-08-27"), average: 0.0 },
      { user_id: user.id, date: new Date("2025-08-26"), average: -0.5 },
      { user_id: user.id, date: new Date("2025-08-25"), average: 0.2 },
    ],
  });

  await prisma.breathing_rates.createMany({
    data: [
      { user_id: user.id, date: new Date("2025-08-31"), breathing_rate: 15.7 },
      { user_id: user.id, date: new Date("2025-08-30"), breathing_rate: 15.2 },
      { user_id: user.id, date: new Date("2025-08-29"), breathing_rate: 16.1 },
      { user_id: user.id, date: new Date("2025-08-28"), breathing_rate: 15.9 },
      { user_id: user.id, date: new Date("2025-08-27"), breathing_rate: 15.4 },
      { user_id: user.id, date: new Date("2025-08-26"), breathing_rate: 15.6 },
      { user_id: user.id, date: new Date("2025-08-25"), breathing_rate: 16.3 },
    ],
  });

  await prisma.heart_rate_variabilities.createMany({
    data: [
      {
        user_id: user.id,
        date: new Date("2025-08-31"),
        daily_rmssd: 48.2,
        deep_rmssd: 55.9,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-30"),
        daily_rmssd: 55.6,
        deep_rmssd: 62.1,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-29"),
        daily_rmssd: 51.0,
        deep_rmssd: 58.5,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-28"),
        daily_rmssd: 45.3,
        deep_rmssd: 51.7,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-27"),
        daily_rmssd: 60.1,
        deep_rmssd: 68.3,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-26"),
        daily_rmssd: 58.2,
        deep_rmssd: 65.0,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-25"),
        daily_rmssd: 53.4,
        deep_rmssd: 60.1,
      },
    ],
  });

  await prisma.spo2_readings.createMany({
    data: [
      {
        user_id: user.id,
        date: new Date("2025-08-31"),
        avg: 96,
        min: 93,
        max: 99,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-30"),
        avg: 97,
        min: 94,
        max: 100,
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
        date: new Date("2025-08-28"),
        avg: 95,
        min: 91,
        max: 98,
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
        date: new Date("2025-08-26"),
        avg: 96,
        min: 93,
        max: 99,
      },
      {
        user_id: user.id,
        date: new Date("2025-08-25"),
        avg: 97,
        min: 95,
        max: 100,
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
