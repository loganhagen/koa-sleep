import {
  SkinTemperature,
  BreathingRate,
  HeartRateVariability,
  SpO2,
} from "@prisma/client";

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
