export interface CoreMetrics {
  bedTime: Date;
  wakeTime: Date;
  duration: number;
  efficiency: number;
}

export interface SleepStages {
  awakeMins: number;
  lightMins: number;
  deepMins: number;
  remMins: number;
}

export interface ComprehensiveSleepRecordDTO {
  date: Date;
  bedtime: Date;
  wakeUpTime: Date;
  totalSleep: number;
  efficiency: number;
  awake: number;
  rem: number;
  light: number;
  deep: number;
  skinTemperature: number;
  breathingRate: number;
  hrv: number;
  spo2: number;
}

export interface ComprehensiveSleepDataDTO {
  id: string;
  data: ComprehensiveSleepRecordDTO[];
}
