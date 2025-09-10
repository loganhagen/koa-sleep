export interface CoreMetricsDTO {
  bed_time: string;
  wake_time: string;
  duration: string;
  efficiency: number;
}

export interface SleepStagesDTO {
  awake_mins: number;
  light_mins: number;
  deep_mins: number;
  rem_mins: number;
}

export interface SleepLogDTO {
  id: string;
  user_id: string;
  date: string;
  bed_time: string;
  wake_time: string;
  duration: string;
  efficiency: number;
  awake_mins: number;
  light_mins: number;
  deep_mins: number;
  rem_mins: number;
}

export interface FullSleepLogDTO {
  id: string;
  user_id: string;
  date: string;
  bed_time: string;
  wake_time: string;
  duration: string;
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
