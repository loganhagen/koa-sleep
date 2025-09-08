export interface SleepLog {
  id: string;
  userId: string;
  dateTime: Date;
  bedTime: string;
  wakeTime: string;
  duration: string;
  efficiency: number;
  awakeMins: number;
  lightMins: number;
  deepMins: number;
  remMins: number;
}
