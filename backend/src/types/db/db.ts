import {
  SkinTemperature,
  BreathingRate,
  HeartRateVariability,
  SpO2,
} from "@prisma/client";

interface SleepLogData {
  dateTime: Date;
  bedTime: Date;
  wakeTime: Date;
  duration: number;
  efficiency: number;
  awakeMins: number;
  lightMins: number;
  deepMins: number;
  remMins: number;
}

interface SkinTemperatureData {
  dateTime: Date;
  average: number;
}

interface BreathingRateData {
  dateTime: Date;
  breathingRate: number;
}

interface HeartRateVariabilityData {
  dateTime: Date;
  dailyRmssd: number;
}

interface SpO2Data {
  dateTime: Date;
  avg: number;
}

export interface ComprehensiveSleepData {
  id: string;
  SleepLog: SleepLogData[];
  SkinTemperature: SkinTemperatureData[];
  BreathingRate: BreathingRateData[];
  HeartRateVariability: HeartRateVariabilityData[];
  SpO2: SpO2Data[];
}

export interface CoreMetrics {
  bedTime: Date;
  wakeTime: Date;
  duration: number;
  efficiency: number;
}

export interface WellnessSummary {
  temperature: SkinTemperature | null;
  breathingRate: BreathingRate | null;
  hrv: HeartRateVariability | null;
  spo2: SpO2 | null;
}
