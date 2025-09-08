import { SleepLogDTO } from "@/types/api/sleep";
import { SleepLog } from "@/types/ui/sleep";
import { formatMillisecondsToHoursMinutes, formatTimeTo12Hour } from "./utils";

export const toSleepLog = (sleepLogDTO: SleepLogDTO): SleepLog => {
  return {
    ...sleepLogDTO,
    dateTime: sleepLogDTO.dateTime.slice(0, 10),
    duration: formatMillisecondsToHoursMinutes(sleepLogDTO.duration),
    bedTime: formatTimeTo12Hour(new Date(sleepLogDTO.bedTime)),
    wakeTime: formatTimeTo12Hour(new Date(sleepLogDTO.wakeTime)),
  };
};
