import { User } from "@prisma/client";
import { formatMillisecondsToHoursMinutes } from "@utils/formatters";
import prisma from "lib/prisma";

export const userService = {
  getUserByEmail: async (email: string): Promise<User | null> => {
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  },
  getFullLogs: async (userId: string) => {
    const [
      sleepLogs,
      skinTemps,
      breathingRates,
      hrVariabilities,
      spo2Readings,
    ] = await Promise.all([
      prisma.sleepLog.findMany({
        where: { userId },
        orderBy: { dateTime: "desc" },
      }),
      prisma.skinTemperature.findMany({ where: { userId } }),
      prisma.breathingRate.findMany({ where: { userId } }),
      prisma.heartRateVariability.findMany({ where: { userId } }),
      prisma.spO2.findMany({ where: { userId } }),
    ]);

    const getDateKey = (date: Date) => date.toISOString().split("T")[0];

    const skinTempMap = new Map(
      skinTemps.map((item) => [getDateKey(item.dateTime), item.average])
    );
    const breathingRateMap = new Map(
      breathingRates.map((item) => [
        getDateKey(item.dateTime),
        item.breathingRate,
      ])
    );
    const hrvMap = new Map(
      hrVariabilities.map((item) => [
        getDateKey(item.dateTime),
        item.dailyRmssd,
      ])
    );
    const spo2Map = new Map(
      spo2Readings.map((item) => [getDateKey(item.dateTime), item.avg])
    );

    const combinedLogs = sleepLogs.map((sleepLog) => {
      const dateKey = getDateKey(sleepLog.dateTime);

      return {
        id: sleepLog.id,
        userId: sleepLog.userId,
        dateTime: sleepLog.dateTime.toISOString(),
        bedTime: sleepLog.bedTime.toISOString(),
        wakeTime: sleepLog.wakeTime.toISOString(),
        duration: formatMillisecondsToHoursMinutes(sleepLog.duration),
        efficiency: sleepLog.efficiency,
        awakeMins: sleepLog.awakeMins,
        lightMins: sleepLog.lightMins,
        deepMins: sleepLog.deepMins,
        remMins: sleepLog.remMins,
        skinTemperature: skinTempMap.get(dateKey) ?? null,
        breathingRate: breathingRateMap.get(dateKey) ?? null,
        hrv: hrvMap.get(dateKey) ?? null,
        spo2: spo2Map.get(dateKey) ?? null,
      };
    });
    return combinedLogs;
  },
};
