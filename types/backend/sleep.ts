export interface SleepStages {
  deep: number;
  light: number;
  rem: number;
  wake: number;
}

export interface SessionSummary {
  duration: number;
  startTime: string;
  endTime: string;
}
