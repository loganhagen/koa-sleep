/**
 * Interface representing a sleep log entry, aligning with the Prisma schema.
 * This corresponds to the data structure for sleep logs from the Fitbit API.
 * @see https://dev.fitbit.com/build/reference/web-api/sleep/get-sleep-log-list/
 */
export interface SleepLog {
  id: string;
  fitbitLogId: string;
  userId: string;
  dateOfSleep: Date;
  duration: number;
  efficiency: number;
  startTime: Date;
  endTime: Date;
  timeInBed: number;
  minutesAsleep: number;
  minutesAwake: number;
  minutesToFallAsleep: number;
  minutesAfterWakeup: number;
  isMainSleep: boolean;
  type: string;
  logType: string;
  infoCode: number;
}
