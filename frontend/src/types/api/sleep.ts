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

export interface SleepStagesDTO {
  awake_mins: number;
  light_mins: number;
  deep_mins: number;
  rem_mins: number;
}

export interface CoreMetricsDTO {
  bed_time: string;
  wake_time: string;
  duration: string;
  efficiency: number;
}
