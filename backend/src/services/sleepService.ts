import { CoreMetrics } from "@custom_types/api/sleep";
import { SleepLog } from "@prisma/client";
import prisma from "lib/prisma";
import { SleepLevelsSchema } from "schemas/sleep";

const processSleepLevels = (sleepLog: SleepLog) => {
  if (!sleepLog.levels) {
    console.log(`Sleep log ${sleepLog.id} has no level data.`);
    return { rem: 0, light: 0, deep: 0 };
  }

  const validationRes = SleepLevelsSchema.safeParse(sleepLog.levels);

  if (!validationRes.success) {
    console.error(
      `Failed to validate sleep levels for log ${sleepLog.id}:`,
      validationRes.error
    );
    return { rem: 0, light: 0, deep: 0 };
  }

  const validatedData = validationRes.data;
  const awakeMinutes = sleepLog.minutesAwake;
  const remMinutes = validatedData.summary.rem.minutes;
  const lightMinutes = validatedData.summary.light.minutes;
  const deepMinutes = validatedData.summary.deep.minutes;

  console.log(
    `Processed sleep stages: REM=${remMinutes}, Light=${lightMinutes}, Deep=${deepMinutes}`
  );

  return {
    awake: awakeMinutes,
    rem: remMinutes,
    light: lightMinutes,
    deep: deepMinutes,
  };
};

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
  getSleepStagesByDate: async (userId: string, date: Date) => {
    const sleepLog = await prisma.sleepLog.findFirst({
      where: {
        userId: userId,
        dateOfSleep: date,
      },
    });

    if (!sleepLog) {
      return;
    }

    return processSleepLevels(sleepLog);
  },
  getCoreMetricsByDate: async (userId: string, date: Date) => {
    const coreMetrics: CoreMetrics | null = await prisma.sleepLog.findFirst({
      where: { userId: userId, dateOfSleep: date },
      select: {
        startTime: true,
        endTime: true,
        duration: true,
        efficiency: true,
      },
    });

    return coreMetrics;
  },
};
