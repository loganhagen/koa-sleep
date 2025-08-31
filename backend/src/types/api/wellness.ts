import { TemperatureLogType } from "@prisma/client";

export interface SkinTempResponseDTO {
  id: string;
  dateTime: Date;
  nightlyRelative: number;
  logType: TemperatureLogType;
}
