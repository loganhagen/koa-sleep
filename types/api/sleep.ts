export interface SleepAPIResponse {
  sleep: SleepData[];
  summary?: SleepSummary;
}

export interface SleepData {
  dateOfSleep: string;
  duration: number;
  efficiency: number;
  endTime: string;
  infoCode: number;
  isMainSleep: boolean;
  levels: SleepLevels;
  logId: number;
  minutesAfterWakeup: number;
  minutesAsleep: number;
  minutesAwake: number;
  minutesToFallAsleep: number;
  logType: string;
  startTime: string;
  timeInBed: number;
  type: string;
}

export interface SleepLevels {
  data: SleepLevelData[];
  shortData: SleepLevelData[];
  summary: SleepLevelSummary;
}

export interface SleepLevelData {
  dateTime: string;
  level: string;
  seconds: number;
}

export interface SleepLevelSummary {
  deep: SleepSummaryDetail;
  light: SleepSummaryDetail;
  rem: SleepSummaryDetail;
  wake: SleepSummaryDetail;
}

export interface SleepSummaryDetail {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}

export interface SleepSummary {
  stages: SleepStages;
  totalMinutesAsleep: number;
  totalSleepRecords: number;
  totalTimeInBed: number;
}

export interface SleepStages {
  deep: number;
  light: number;
  rem: number;
  wake: number;
}
