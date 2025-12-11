import {
  skin_temperatures,
  breathing_rates,
  heart_rate_variabilities,
  spo2_readings,
} from "@prisma/client";

export interface CoreMetrics {
  bed_time: Date;
  wake_time: Date;
  duration_ms: bigint;
  efficiency: number;
}

export interface WellnessSummary {
  skin_temperature: skin_temperatures | null;
  breathing_rate: breathing_rates | null;
  hrv: heart_rate_variabilities | null;
  spo2: spo2_readings | null;
}

/* Returned by the getFullLogs() user service function. */
export interface FullSleepLog {
  id: number;
  user_id: string;
  date: Date;
  bed_time: Date;
  wake_time: Date;
  duration_ms: bigint;
  efficiency: number;
  awake_mins: number;
  light_mins: number;
  deep_mins: number;
  rem_mins: number;
  skin_temperature: number | null;
  breathing_rate: number | null;
  hrv: number | null;
  spo2: number | null;
}
