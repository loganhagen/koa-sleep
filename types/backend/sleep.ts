export interface SleepStages {
  deep: number;
  light: number;
  rem: number;
  wake: number;
}

export interface SleepSummary {
  duration: number;
  startTime: Date;
  startTimeQuantity: number;
  endTime: Date;
  endTimeQuantity: number;
}

export interface SleepStats {
  mean: number;
  standardDeviation: number;
  deviationInMins: number;
  coefficientOfVariation: number;
}

export interface WeeklySleepStats {
  bedTimeStats: SleepStats;
  wakeTimeStats: SleepStats;
}

export interface LastNightSleep {
  totalSleep: string;
  bedtime: string;
  sleepScore: string;
}
