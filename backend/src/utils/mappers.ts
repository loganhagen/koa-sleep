import {
  BreathingRate,
  HeartRateVariability,
  SpO2,
  User,
} from "@prisma/client";
import { UserDTO } from "../types/api/user";
import { BreathingRateDTO, HrvDTO, Spo2DTO } from "@custom_types/api/wellness";

export const toUserDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
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
