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

import { formatMillisecondsToHoursMinutes } from "./formatters";
import {
  CoreMetricsDTO,
  FullSleepLogDTO,
  SleepLogDTO,
} from "@custom_types/api/sleep";

export const toUserDTO = (user: users): UserDTO => {
  return {
    id: user.id,
    full_name: user.full_name,
    first_name: user.first_name ?? undefined,
    last_name: user.last_name ?? undefined,
    display_name: user.display_name ?? undefined,
  };
};

export const toSleepLogDTO = (log: sleep_logs): SleepLogDTO => {
  return {
    id: log.id.toString(),
    user_id: log.user_id,
    date: log.date.toISOString(),
    bed_time: log.bed_time.toISOString(),
    wake_time: log.wake_time.toISOString(),
    duration: formatMillisecondsToHoursMinutes(log.duration_ms),
    efficiency: log.efficiency,
    awake_mins: log.awake_mins,
    light_mins: log.light_mins,
    deep_mins: log.deep_mins,
    rem_mins: log.rem_mins,
  };
};

/* Maps a FullSleepLog to a SleepLogDTO */
export const toFullSleepLogDTO = (log: FullSleepLog): FullSleepLogDTO => {
  return {
    id: log.id.toString(),
    user_id: log.user_id,
    date: log.date.toISOString(),
    bed_time: log.bed_time.toISOString(),
    wake_time: log.wake_time.toISOString(),
    duration: formatMillisecondsToHoursMinutes(log.duration_ms),
    efficiency: log.efficiency,
    awake_mins: log.awake_mins,
    light_mins: log.light_mins,
    deep_mins: log.deep_mins,
    rem_mins: log.rem_mins,
    skin_temperature: log.skin_temperature,
    breathing_rate: log.breathing_rate,
    hrv: log.hrv,
    spo2: log.spo2,
  };
};

export const toCoreMetricsDTO = (model: CoreMetrics): CoreMetricsDTO => {
  return {
    bed_time: model.bed_time.toISOString(),
    wake_time: model.wake_time.toISOString(),
    duration: formatMillisecondsToHoursMinutes(model.duration_ms),
    efficiency: model.efficiency,
  };
};

export const toBreathingRateDTO = (
  model: breathing_rates
): BreathingRateDTO => {
  return {
    id: model.id.toString(),
    date: model.date.toISOString(),
    value: model.breathing_rate,
  };
};

export const toHrvDTO = (model: heart_rate_variabilities): HrvDTO => {
  return {
    id: model.id.toString(),
    date: model.date.toISOString(),
    value: model.daily_rmssd,
  };
};

export const toSpo2DTO = (model: spo2_readings): Spo2DTO => {
  return {
    id: model.id.toString(),
    date: model.date.toISOString(),
    value: model.avg,
  };
};

export const toWellnessSummaryDTO = (
  wellnessSummary: WellnessSummary
): WellnessSummaryDTO => {
  return {
    skin_temperature:
      wellnessSummary.skin_temperature?.average.toString() ?? "N/A",
    breathing_rate:
      wellnessSummary.breathing_rate?.breathing_rate.toString() ?? "N/A",
    hrv: wellnessSummary.hrv?.daily_rmssd.toString() ?? "N/A",
    spo2: wellnessSummary.spo2?.avg.toString() ?? "N/A",
  };
};
