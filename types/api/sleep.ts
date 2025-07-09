export interface FitbitData {
  sleep: SleepLog[];
  pagination: Pagination;
}

export interface Pagination {
  afterDate?: string;
  beforeDate?: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  sort: "asc" | "desc";
}

export type SleepLog = StagesSleepLog | ClassicSleepLog;

interface BaseSleepLog {
  dateOfSleep: string;
  duration: number;
  efficiency: number;
  endTime: string;
  infoCode: number;
  isMainSleep: boolean;
  logId: number;
  minutesAfterWakeup: number;
  minutesAsleep: number;
  minutesAwake: number;
  minutesToFallAsleep: number;
  startTime: string;
  timeInBed: number;
}

export interface StagesSleepLog extends BaseSleepLog {
  type: "stages";
  levels: {
    data: SleepLevelData[];
    summary: StagesSleepSummary;
  };
}

export interface ClassicSleepLog extends BaseSleepLog {
  type: "classic";
  levels: {
    summary: ClassicSleepSummary;
  };
}

/**
 * Represents a specific period within a detailed sleep stage.
 * Only applicable to "stages" sleep logs.
 */
export interface SleepLevelData {
  dateTime: string;
  level: "wake" | "light" | "deep" | "rem";
  seconds: number;
}

export interface StagesSleepSummary {
  deep: StagesSleepStageSummary;
  light: StagesSleepStageSummary;
  rem: StagesSleepStageSummary;
  wake: StagesSleepStageSummary;
}

export interface StagesSleepStageSummary {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes?: number;
}

export interface ClassicSleepSummary {
  asleep: { count: number; minutes: number };
  awake: { count: number; minutes: number };
  restless: { count: number; minutes: number };
}
