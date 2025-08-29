import { Prisma, SleepLog } from "@prisma/client";

// The 'fitbitLogId' is a BigInt, which can't be directly serialized into JSON.
export type SerializableSleepLog = Omit<SleepLog, "fitbitLogId"> & {
  fitbitLogId: string;
};

export interface SleepLogDTO {
  id: string;
  fitbitLogId: string;
  userId: string;
  dateOfSleep: Date;
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
  levels?: Prisma.JsonValue | null;
}
