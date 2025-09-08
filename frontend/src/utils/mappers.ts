import { SleepLogDTO } from "@/types/api/sleep";
import { SleepLog } from "@/types/ui/sleep";
import { formatMillisecondsToHoursMinutes, formatTimeTo12Hour } from "./utils";

export const toSleepLog = (sleepLogDTO: SleepLogDTO): SleepLog => {
  return {
    ...sleepLogDTO,
    duration: formatMillisecondsToHoursMinutes(sleepLogDTO.duration),
    bedTime: formatTimeTo12Hour(new Date(sleepLogDTO.bedTime)),
    wakeTime: formatTimeTo12Hour(new Date(sleepLogDTO.wakeTime)),
  };
};
