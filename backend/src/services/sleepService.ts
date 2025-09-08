import { SleepStagesDTO } from "@custom_types/api/sleep";
import { CoreMetrics } from "@custom_types/db/db";
import { SleepLog } from "@prisma/client";
import prisma from "lib/prisma";

export const sleepService = {
  getSleepLogsByUserId: async (userId: string): Promise<SleepLog[]> => {
    const sleepLogs: SleepLog[] = await prisma.sleepLog.findMany({
      where: {
        userId: userId,
      },
    });
    return sleepLogs;
  },

  getSleepLogByDate: async (
    userId: string,
    date: Date
  ): Promise<SleepLog | null> => {
    const sleepLog: SleepLog | null = await prisma.sleepLog.findFirst({
      where: {
        userId: userId,
        dateTime: date,
      },
    });
    return sleepLog;
  },
  getMostRecentSleepLog: async (userId: string): Promise<SleepLog | null> => {
    const mostRecentSleepLog: SleepLog | null = await prisma.sleepLog.findFirst(
      {
        where: {
          userId: userId,
        },
        orderBy: {
          dateTime: "desc",
        },
      }
    );
    return mostRecentSleepLog;
  },
  getCoreMetricsByDate: async (userId: string, date: Date) => {
    const coreMetrics: CoreMetrics | null = await prisma.sleepLog.findFirst({
      where: { userId: userId, dateTime: date },
      select: {
        bedTime: true,
        wakeTime: true,
        duration: true,
        efficiency: true,
      },
    });
    return coreMetrics;
  },
  getSleepStagesByDate: async (
    userId: string,
    date: Date
  ): Promise<SleepStagesDTO | null> => {
    const sleepStages = await prisma.sleepLog.findFirst({
      where: { userId: userId, dateTime: date },
      select: {
        awakeMins: true,
        lightMins: true,
        deepMins: true,
        remMins: true,
      },
    });
    return sleepStages;
  },
};
