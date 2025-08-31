import {
  BreathingRate,
  HeartRateVariability,
  SkinTemperature,
  SpO2,
} from "@prisma/client";
import prisma from "lib/prisma";

export const wellnessService = {
  getTemperatureLogs: async (userId: string): Promise<SkinTemperature[]> => {
    const log: SkinTemperature[] = await prisma.skinTemperature.findMany({
      where: {
        userId: userId,
      },
    });
    return log;
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
  getBreathingRateByDate: async (
    userId: string,
    date: Date
  ): Promise<BreathingRate | null> => {
    const log = await prisma.breathingRate.findFirst({
      where: {
        userId: userId,
        dateTime: date,
      },
    });
    return log;
  },
  getHRVByDate: async (
    userId: string,
    date: Date
  ): Promise<HeartRateVariability | null> => {
    const log = await prisma.heartRateVariability.findFirst({
      where: {
        userId: userId,
        dateTime: date,
      },
    });
    return log;
  },
  getSPO2ByDate: async (userId: string, date: Date): Promise<SpO2 | null> => {
    const log = await prisma.spO2.findFirst({
      where: {
        userId: userId,
        dateTime: date,
      },
    });
    return log;
  },
};
