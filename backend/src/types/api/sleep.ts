import { SleepLog } from "@prisma/client";

export interface SleepLogDTO {
  id: string;
  fitbitLogId: string;
  userId: string;
  dateOfSleep: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  efficiency: number;
  minutesToFallAsleep: number;
  minutesAsleep: number;
  minutesAwake: number;
  timeInBed: number;
  isMainSleep: boolean;
  type: string;
  infoCode: number;
  levels?: SleepLevels | null;
}

export interface SleepLevelSummaryItem {
  count: number;
  minutes: number;
  thirtyDayAvgMinutes: number;
}

export interface SleepLevelData {
  dateTime: string;
  level: "deep" | "light" | "rem" | "wake";
  seconds: number;
}

export interface SleepLevels {
  summary: {
    deep: SleepLevelSummaryItem;
    light: SleepLevelSummaryItem;
    rem: SleepLevelSummaryItem;
    wake: SleepLevelSummaryItem;
  };
  data: SleepLevelData[];
  shortData?: SleepLevelData[];
}
