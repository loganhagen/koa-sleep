export interface SleepLogDTO {
  id: string;
  userId: string;
  dateTime: string;
  bedTime: Date;
  wakeTime: Date;
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

export interface SleepStagesDTO {
  awakeMins: number;
  lightMins: number;
  deepMins: number;
  remMins: number;
}

export type FullLogDTO = {
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
};
