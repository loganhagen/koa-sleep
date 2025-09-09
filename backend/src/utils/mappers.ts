import {
  breathing_rates,
  heart_rate_variabilities,
  sleep_logs,
  spo2_readings,
  users,
} from "@prisma/client";
import { UserDTO } from "../types/api/user";
import {
  BreathingRateDTO,
  HrvDTO,
  Spo2DTO,
  WellnessSummaryDTO,
} from "@custom_types/api/wellness";
import {
  CoreMetrics,
  FullSleepLog,
  WellnessSummary,
} from "@custom_types/db/db";

import {
  formatDateString,
  formatMillisecondsToHoursMinutes,
} from "./formatters";
import { SleepLogDTO } from "@custom_types/api/sleep";

export const toUserDTO = (user: users): UserDTO => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };
};

/* Maps a FullSleepLog to a SleepLogDTO */
export const toSleepLogDTO = (log: FullSleepLog): SleepLogDTO => {
  return {
    id: log.id.toString(),
    user_id: log.user_id,
    date: log.dateTime.toISOString(),
    bed_time: log.bed_time.toISOString(),
    wake_time: log.wake_time.toISOString(),
    duration: formatMillisecondsToHoursMinutes(Number(log.duration_ms)),
    efficiency: log.efficiency,
    awake_mins: log.efficiency,
    light_mins: log.light_mins,
    deep_mins: log.deep_mins,
    rem_mins: log.remMins,
    skin_temperature: log.skin_temperature,
    breathing_rate: log.breathing_rate,
    hrv: log.hrv,
    spo2: log.spo2,
  };
};

export const toCoreMetricsDTO = (coreMetrics: CoreMetrics) => {
  return {
    ...coreMetrics,
    duration: formatMillisecondsToHoursMinutes(coreMetrics.duration),
  };
};

export const toBreathingRateDTO = (
  model: breathing_rates
): BreathingRateDTO => {
  return {
    id: model.id.toString(),
    date: model.date,
    value: model.breathing_rate,
  };
};

export const toHrvDTO = (model: heart_rate_variabilities): HrvDTO => {
  return {
    id: model.id.toString(),
    date: model.date,
    value: model.daily_rmssd,
    deepRmssd: model.deep_rmssd,
  };
};

export const toSpo2DTO = (model: spo2_readings): Spo2DTO => {
  return {
    id: model.id.toString(),
    date: model.date,
    value: model.avg,
    min: model.min,
    max: model.max,
  };
};

export const toWellnessSummaryDTO = (
  wellnessSummary: WellnessSummary
): WellnessSummaryDTO => {
  return {
    skin_temperature:
      wellnessSummary.skin_temperature?.average.toString() ?? "N/A",
    breathingRate:
      wellnessSummary.breathing_rate?.breathingRate.toString() ?? "N/A",
    hrv: wellnessSummary.hrv?.dailyRmssd.toString() ?? "N/A",
    spo2: wellnessSummary.spo2?.avg.toString() ?? "N/A",
  };
};
