import { SkinTemperature } from "@prisma/client";
import prisma from "lib/prisma";

export const skinTempService = {
  getTemperatureLogs: async (userId: string): Promise<SkinTemperature[]> => {
    const res: SkinTemperature[] = await prisma.skinTemperature.findMany({
      where: {
        userId: userId,
      },
    });
    return res;
  },
  getTemperatureLogByDate: async (
    userId: string,
    date: Date
  ): Promise<SkinTemperature | null> => {
    const log: SkinTemperature | null = await prisma.skinTemperature.findFirst({
      where: {
        userId: userId,
        dateTime: date,
      },
    });
    return log;
  },
};
