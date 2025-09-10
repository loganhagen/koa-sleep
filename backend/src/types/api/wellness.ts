export interface TemperatureDTO {
  id: string;
  date: string;
  value: number;
}

export interface BreathingRateDTO {
  id: string;
  date: string;
  value: number;
}

export interface HrvDTO {
  id: string;
  date: string;
  value: number;
}

export interface Spo2DTO {
  id: string;
  date: string;
  value: number;
}

export interface WellnessSummaryDTO {
  skin_temperature: string;
  breathing_rate: string;
  hrv: string;
  spo2: string;
}
