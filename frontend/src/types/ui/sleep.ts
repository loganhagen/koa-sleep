export interface SleepLog {
  id: string;
  userId: string;
  dateTime: string;
  bedTime: string;
  wakeTime: string;
  duration: string;
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
