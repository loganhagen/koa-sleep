import {
  BreathingRate,
  HeartRateVariability,
  SpO2,
  User,
} from "@prisma/client";
import { UserDTO } from "../types/api/user";
import {
  BreathingRateDTO,
  HrvDTO,
  Spo2DTO,
  WellnessSummaryDTO,
} from "@custom_types/api/wellness";
import { CoreMetrics, WellnessSummary } from "@custom_types/db/db";

import { formatMillisecondsToHoursMinutes } from "./formatters";

export const toUserDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const toCoreMetricsDTO = (coreMetrics: CoreMetrics) => {
  return {
    ...coreMetrics,
    duration: formatMillisecondsToHoursMinutes(coreMetrics.duration),
  };
};

export const toBreathingRateDTO = (model: BreathingRate): BreathingRateDTO => {
  return {
    id: model.id,
    dateTime: model.dateTime,
    breathingRateValue: model.breathingRate,
  };
};

export const toHrvDTO = (model: HeartRateVariability): HrvDTO => {
  return {
    id: model.id,
    dateTime: model.dateTime,
    dailyRmssd: model.dailyRmssd,
    deepRmssd: model.deepRmssd,
  };
};

export const toSpo2DTO = (model: SpO2): Spo2DTO => {
  return {
    id: model.id,
    dateTime: model.dateTime,
    avg: model.avg,
    min: model.min,
    max: model.max,
  };
};

export const toWellnessSummaryDTO = (
  wellnessSummary: WellnessSummary
): WellnessSummaryDTO => {
  return {
    skinTemperature: wellnessSummary.temperature?.average.toString() ?? "N/A",
    breathingRate:
      wellnessSummary.breathingRate?.breathingRate.toString() ?? "N/A",
    hrv: wellnessSummary.hrv?.dailyRmssd.toString() ?? "N/A",
    spo2: wellnessSummary.spo2?.avg.toString() ?? "N/A",
  };
};
