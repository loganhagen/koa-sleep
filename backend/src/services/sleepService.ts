import { sleep_logs } from "@prisma/client";
import prisma from "@lib/prisma";

export const sleepService = {
  getSleepLogsByUserId: async (userId: string) => {
    const sleepLogs: sleep_logs[] = await prisma.sleep_logs.findMany({
      where: {
        user_id: userId,
      },
    });
    return sleepLogs;
  },

  getSleepLogByDate: async (
    userId: string,
    date: Date
  ): Promise<sleep_logs | null> => {
    const sleepLog: sleep_logs | null = await prisma.sleep_logs.findFirst({
      where: {
        user_id: userId,
        date: date,
      },
    });
    return sleepLog;
  },
  getMostRecentSleepLog: async (userId: string) => {
    const mostRecentSleepLog: sleep_logs | null =
      await prisma.sleep_logs.findFirst({
        where: {
          user_id: userId,
        },
        orderBy: {
          date: "desc",
        },
      });
    return mostRecentSleepLog;
  },
  getCoreMetricsByDate: async (userId: string, date: Date) => {
    const coreMetrics = await prisma.sleep_logs.findFirst({
      where: { user_id: userId, date: date },
      select: {
        bed_time: true,
        wake_time: true,
        duration_ms: true,
        efficiency: true,
      },
    });
    return coreMetrics;
  },
  getSleepStagesByDate: async (userId: string, date: Date) => {
    const sleepStages = await prisma.sleep_logs.findFirst({
      where: { user_id: userId, date: date },
      select: {
        awake_mins: true,
        light_mins: true,
        deep_mins: true,
        rem_mins: true,
      },
    });
    return sleepStages;
  },
};
