export interface SleepLogDTO {
  id: string;
  userId: string;
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
export interface SleepStages {
  awake: number;
  rem: number;
  light: number;
  deep: number;
}

export interface CoreMetrics {
  bedTime: Date;
  wakeTime: Date;
  duration: number;
  efficiency: number;
}

export interface SleepStagesDTO {
  awakeMins: number;
  lightMins: number;
  deepMins: number;
  remMins: number;
}
