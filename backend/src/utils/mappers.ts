import { BreathingRate, SkinTemperature, SleepLog, User } from "@prisma/client";
import { UserDTO } from "../types/api/user";
import { SleepLevels, SleepLogDTO } from "@custom_types/api/sleep";
import { BreatingRateDTO, TemperatureDTO } from "@custom_types/api/wellness";

export const toUserDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const toSleepLogDTO = (sleepLog: SleepLog): SleepLogDTO => {
  return {
    id: sleepLog.id,
    fitbitLogId: sleepLog.fitbitLogId.toString(),
    userId: sleepLog.userId,
    dateOfSleep: sleepLog.dateOfSleep,
    startTime: sleepLog.startTime,
    endTime: sleepLog.endTime,
    duration: sleepLog.duration,
    efficiency: sleepLog.efficiency,
    minutesToFallAsleep: sleepLog.minutesToFallAsleep,
    minutesAsleep: sleepLog.minutesAsleep,
    minutesAwake: sleepLog.minutesAwake,
    timeInBed: sleepLog.timeInBed,
    isMainSleep: sleepLog.isMainSleep,
    type: sleepLog.type,
    infoCode: sleepLog.infoCode,
    levels: sleepLog.levels as SleepLevels | null,
  };
};

export const toSkinTempDTO = (model: SkinTemperature): TemperatureDTO => {
  return {
    id: model.id,
    dateTime: model.dateTime,
    nightlyRelative: model.nightlyRelative,
    logType: model.logType,
  };
};

export const toBreathingRateDTO = (model: BreathingRate): BreatingRateDTO => {
  return {
    id: model.id,
    dateTime: model.dateTime,
    breathingRate: model.breathingRate,
  };
};
