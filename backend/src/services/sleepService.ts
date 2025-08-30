/**
 * The service layer features any required business logic to translate API responses into the data required by the controller.
 * No HTTP-related code should be found here.
 */

import { PrismaClient } from "@prisma/client";
import { toSleepLogDTO } from "@utils/mappers";

const prisma = new PrismaClient();

export const sleepService = {
  getSleepLogs: async () => {
    const sleepLogs = await prisma.sleepLog.findMany();
    return sleepLogs.map(toSleepLogDTO);
  },

  getSleepLogsByUserId: async (userId: string) => {
    const sleepLogs = await prisma.sleepLog.findMany({
      where: {
        userId: userId,
      },
    });
    return sleepLogs.map(toSleepLogDTO);
  },
  getSleepLogByDate: async (userId: string, date: string) => {
    const sleepLog = await prisma.sleepLog.findFirst({
      where: {
        userId: userId,
        dateOfSleep: date,
      },
    });
    return sleepLog;
  },
  getMostRecentSleepLog: async (userId: string) => {
    const mostRecentSleepLog = await prisma.sleepLog.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        dateOfSleep: "desc",
      },
    });
    console.log(mostRecentSleepLog);
    return mostRecentSleepLog;
  },
};
