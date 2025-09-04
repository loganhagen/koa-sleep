import { TemperatureLogType } from "@prisma/client";

export interface TemperatureDTO {
  id: string;
  dateTime: Date;
  nightlyRelative: number;
  logType: TemperatureLogType;
}

export interface BreathingRateDTO {
  id: string;
  dateTime: Date;
  breathingRateValue: number;
}

export interface HrvDTO {
  id: string;
  dateTime: Date;
  dailyRmssd: number;
  deepRmssd: number;
}

export interface Spo2DTO {
  id: string;
  dateTime: Date;
  avg: number;
  min: number;
  max: number;
}

export interface WellnessSummaryDTO {
  skinTemperature: string;
  breathingRate: string;
  hrv: string;
  spo2: string;
}
