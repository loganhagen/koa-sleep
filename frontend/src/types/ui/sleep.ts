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
  skinTemperature: number | null;
  breathingRate: number | null;
  hrv: number | null;
  spo2: number | null;
}
