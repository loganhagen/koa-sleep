/**
 * The service layer features any required business logic to translate API responses into the data required by the controller.
 * No HTTP-related code should be found here.
 */

import { SleepLog } from "@custom_types/db/sleep";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sleepService = {
  getSleepLogs: async () => {
    const sleepLogs = await prisma.sleepLog.findMany();
    // The 'fitbitLogId' is a BigInt, which can't be directly serialized into JSON.
    const serializableSleepLogs: SleepLog[] = sleepLogs.map((log) => ({
      ...log,
      fitbitLogId: log.fitbitLogId.toString(),
    }));
    return serializableSleepLogs;
  },

  getMostRecentSleepLog: async (id: string) => {
    const sleepLogs = await prisma.sleepLog.findMany({ where: { userId: id } });
    const serializableSleepLogs: SleepLog[] = sleepLogs.map((log) => ({
      ...log,
      fitbitLogId: log.fitbitLogId.toString(),
    }));

    serializableSleepLogs.sort((a, b) => {
      const dateA = new Date(a.startTime);
      const dateB = new Date(b.startTime);

      return dateB.getTime() - dateA.getTime();
    });

    return serializableSleepLogs[0];
  },
};
