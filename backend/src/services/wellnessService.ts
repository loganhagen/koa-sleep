import { WellnessSummary } from "@custom_types/db/db";
import {
  BreathingRate,
  HeartRateVariability,
  SkinTemperature,
  SpO2,
} from "@prisma/client";
import prisma from "lib/prisma";

export const wellnessService = {
  getWellnessSummaryByDate: async (
    userId: string,
    date: Date
  ): Promise<WellnessSummary | null> => {
    const tempPromise = prisma.skinTemperature.findFirst({
      where: { userId, dateTime: date },
    });
    const breathingRatePromise = prisma.breathingRate.findFirst({
      where: { userId, dateTime: date },
    });
    const hrvPromise = prisma.heartRateVariability.findFirst({
      where: { userId, dateTime: date },
    });
    const spo2Promise = prisma.spO2.findFirst({
      where: { userId, dateTime: date },
    });

    const [temperature, breathingRate, hrv, spo2] = await Promise.all([
      tempPromise,
      breathingRatePromise,
      hrvPromise,
      spo2Promise,
    ]);

    if (!temperature && !breathingRate && !hrv && !spo2) {
      return null;
    }

    return { temperature, breathingRate, hrv, spo2 };
  },
};
