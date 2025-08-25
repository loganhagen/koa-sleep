export interface SleepCardState {
  duration: number;
  efficiency: number;
  wake: number;
  light: number;
  deep: number;
}

export interface MostRecentSleep {
  date: string;
  bedtime: string;
  wakeUp: string;
  totalSleep: string;
  efficiency: string;
}
