import { SleepLog } from "@prisma/client";

// The 'fitbitLogId' is a BigInt, which can't be directly serialized into JSON.
export type SerializableSleepLog = Omit<SleepLog, "fitbitLogId"> & {
  fitbitLogId: string;
};
