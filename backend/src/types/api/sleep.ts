export interface CoreMetrics {
  bedTime: Date;
  wakeTime: Date;
  duration: number;
  efficiency: number;
}

export interface SleepStages {
  awakeMins: number;
  lightMins: number;
  deepMins: number;
  remMins: number;
}
