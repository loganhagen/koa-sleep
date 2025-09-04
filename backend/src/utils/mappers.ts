import {
  BreathingRate,
  HeartRateVariability,
  SpO2,
  User,
} from "@prisma/client";
import { UserDTO } from "../types/api/user";
import { BreathingRateDTO, HrvDTO, Spo2DTO } from "@custom_types/api/wellness";
import { ComprehensiveSleepData, CoreMetrics } from "@custom_types/db/db";

import {
  formatDateString,
  formatMillisecondsToHoursMinutes,
} from "./formatters";
import {
  ComprehensiveSleepDataDTO,
  ComprehensiveSleepRecordDTO,
} from "@custom_types/api/sleep";

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

export const toComprehensiveSleepDataDTO = (
  userData: ComprehensiveSleepData
): ComprehensiveSleepDataDTO => {
  if (!userData || !userData.SleepLog || userData.SleepLog.length === 0) {
    return { id: userData?.id || "", data: [] };
  }

  const skinTempMap = new Map(
    userData.SkinTemperature.map((item) => [
      formatDateString(item.dateTime),
      item,
    ])
  );
  const breathingRateMap = new Map(
    userData.BreathingRate.map((item) => [
      formatDateString(item.dateTime),
      item,
    ])
  );
  const hrvMap = new Map(
    userData.HeartRateVariability.map((item) => [
      formatDateString(item.dateTime),
      item,
    ])
  );
  const spo2Map = new Map(
    userData.SpO2.map((item) => [formatDateString(item.dateTime), item])
  );

  const records: ComprehensiveSleepRecordDTO[] = userData.SleepLog.map(
    (log) => {
      const recordDateStr = formatDateString(log.wakeTime);

      const skinTempData = skinTempMap.get(recordDateStr);
      const breathingRateData = breathingRateMap.get(recordDateStr);
      const hrvData = hrvMap.get(recordDateStr);
      const spo2Data = spo2Map.get(recordDateStr);

      return {
        date: log.wakeTime,
        bedtime: log.bedTime,
        wakeUpTime: log.wakeTime,
        totalSleep: log.duration,
        efficiency: log.efficiency,
        awake: log.awakeMins,
        rem: log.remMins,
        light: log.lightMins,
        deep: log.deepMins,
        skinTemperature: skinTempData?.average ?? 0,
        breathingRate: breathingRateData?.breathingRate ?? 0,
        hrv: hrvData?.dailyRmssd ?? 0,
        spo2: spo2Data?.avg ?? 0,
      };
    }
  );

  return {
    id: userData.id,
    data: records,
  };
};
