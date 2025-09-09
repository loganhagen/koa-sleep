import { users } from "@prisma/client";
import { formatMillisecondsToHoursMinutes } from "@utils/formatters";
import prisma from "@lib/prisma";

export const userService = {
  getUserByEmail: async (email: string) => {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  },
  getFullLogs: async (user_id: string) => {
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
        userId: sleepLog.user_id,
        dateTime: sleepLog.date.toISOString(),
        bedTime: sleepLog.bed_time.toISOString(),
        wakeTime: sleepLog.wake_time.toISOString(),
        duration: formatMillisecondsToHoursMinutes(
          Number(sleepLog.duration_ms)
        ),
        efficiency: sleepLog.efficiency,
        awakeMins: sleepLog.awake_mins,
        lightMins: sleepLog.light_mins,
        deepMins: sleepLog.deep_mins,
        remMins: sleepLog.rem_mins,
        skinTemperature: skinTempMap.get(dateKey) ?? null,
        breathingRate: breathingRateMap.get(dateKey) ?? null,
        hrv: hrvMap.get(dateKey) ?? null,
        spo2: spo2Map.get(dateKey) ?? null,
      };
    });
    return combinedLogs;
  },
};
