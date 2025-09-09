import prisma from "@lib/prisma";

export const wellnessService = {
  getWellnessSummaryByDate: async (user_id: string, date: Date) => {
    const tempPromise = prisma.skin_temperatures.findFirst({
      where: { user_id, date },
    });
    const breathingRatePromise = prisma.breathing_rates.findFirst({
      where: { user_id, date },
    });
    const hrvPromise = prisma.heart_rate_variabilities.findFirst({
      where: { user_id, date },
    });
    const spo2Promise = prisma.spo2_readings.findFirst({
      where: { user_id, date },
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
