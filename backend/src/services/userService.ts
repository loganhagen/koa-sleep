import prisma from "@lib/prisma";
import { FullSleepLog } from "@custom_types/db/db";
import { users } from "@prisma/client";

export const userService = {
  getUserByEmail: async (email: string): Promise<users | null> => {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  },
  getFullSleepLogs: async (user_id: string): Promise<FullSleepLog[]> => {
    const [
      sleepLogs,
      skinTemps,
      breathingRates,
      hrVariabilities,
      spo2Readings,
    ] = await Promise.all([
      prisma.sleep_logs.findMany({
        where: { user_id },
        orderBy: { date: "desc" },
      }),
      prisma.skin_temperatures.findMany({ where: { user_id } }),
      prisma.breathing_rates.findMany({ where: { user_id } }),
      prisma.heart_rate_variabilities.findMany({ where: { user_id } }),
      prisma.spo2_readings.findMany({ where: { user_id } }),
    ]);

    const getDateKey = (date: Date) => date.toISOString().split("T")[0];

    const skinTempMap = new Map(
      skinTemps.map((item) => [getDateKey(item.date), item.average])
    );
    const breathingRateMap = new Map(
      breathingRates.map((item) => [getDateKey(item.date), item.breathing_rate])
    );
    const hrvMap = new Map(
      hrVariabilities.map((item) => [getDateKey(item.date), item.daily_rmssd])
    );
    const spo2Map = new Map(
      spo2Readings.map((item) => [getDateKey(item.date), item.avg])
    );

    const combinedLogs = sleepLogs.map((sleepLog) => {
      const dateKey = getDateKey(sleepLog.date);

      return {
        id: sleepLog.id,
        user_id: sleepLog.user_id,
        date: sleepLog.date,
        bed_time: sleepLog.bed_time,
        wake_time: sleepLog.wake_time,
        duration_ms: sleepLog.duration_ms,
        efficiency: sleepLog.efficiency,
        awake_mins: sleepLog.awake_mins,
        light_mins: sleepLog.light_mins,
        deep_mins: sleepLog.deep_mins,
        rem_mins: sleepLog.rem_mins,
        skin_temperature: skinTempMap.get(dateKey) ?? null,
        breathing_rate: breathingRateMap.get(dateKey) ?? null,
        hrv: hrvMap.get(dateKey) ?? null,
        spo2: spo2Map.get(dateKey) ?? null,
      };
    });
    return combinedLogs;
  },
};
