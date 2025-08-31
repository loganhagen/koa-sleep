export interface TemperatureLog {
  id: string;
  dateTime: Date;
  nightlyRelative: number;
  logType: string;
}

export interface BreathingRateLog {
  id: string;
  dateTime: Date;
  breathingRateValue: number;
}

export interface HrvLog {
  id: string;
  dateTime: Date;
  dailyRmssd: number;
  deepRmssd: number;
}

export interface Spo2Log {
  id: string;
  dateTime: Date;
  avg: number;
  min: number;
  max: number;
}
