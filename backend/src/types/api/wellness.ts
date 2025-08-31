import {
  BreathingRate,
  HeartRateVariability,
  SkinTemperature,
  SpO2,
  TemperatureLogType,
} from "@prisma/client";

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

export interface WellnessSummary {
  temperature: SkinTemperature | null;
  breathingRate: BreathingRate | null;
  hrv: HeartRateVariability | null;
  spo2: SpO2 | null;
}

export interface WellnessSummaryDTO {
  temperature: TemperatureDTO | null;
  breathingRate: BreathingRateDTO | null;
  hrv: HrvDTO | null;
  spo2: Spo2DTO | null;
}
