import { TemperatureLogType } from "@prisma/client";

export interface TemperatureDTO {
  id: string;
  dateTime: Date;
  nightlyRelative: number;
  logType: TemperatureLogType;
}

export interface BreatingRateDTO {
  id: string;
  dateTime: Date;
  breathingRate: number;
}
