import { SleepLog } from "@prisma/client";
import { toSleepLogDTO } from "@utils/mappers";
import prisma from "lib/prisma";

export const sleepService = {
  getSleepLogs: async (): Promise<SleepLog[]> => {
    const sleepLogs: SleepLog[] = await prisma.sleepLog.findMany();
    return sleepLogs;
  },

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
    const sleepLog = await prisma.sleepLog.findFirst({
      where: {
        userId: userId,
        dateOfSleep: date,
      },
    });
    return sleepLog;
  },
  getMostRecentSleepLog: async (userId: string): Promise<SleepLog | null> => {
    const mostRecentSleepLog = await prisma.sleepLog.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        dateOfSleep: "desc",
      },
    });
    return mostRecentSleepLog;
  },
};
