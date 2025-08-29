/**
 * The service layer features any required business logic to translate API responses into the data required by the controller.
 * No HTTP-related code should be found here.
 */

import { SerializableSleepLog } from "@custom_types/api/sleep";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sleepService = {
  getSleepLogs: async () => {
    const sleepLogs = await prisma.sleepLog.findMany();
    const serializableSleepLogs: SerializableSleepLog[] = sleepLogs.map(
      (log) => ({
        ...log,
        fitbitLogId: log.fitbitLogId.toString(),
      })
    );
    return serializableSleepLogs;
  },

  getSleepLogByUser: async (email: string) => {},
};
