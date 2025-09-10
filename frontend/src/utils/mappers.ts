import { SleepLogDTO } from "@/types/api/sleep";
import { SleepLog } from "@/types/ui/sleep";
import { formatTimeTo12Hour } from "./utils";

export const toSleepLog = (sleepLogDTO: SleepLogDTO): SleepLog => {
  return {
    id: sleepLogDTO.id,
    userId: sleepLogDTO.user_id,
    dateTime: sleepLogDTO.date.slice(0, 10),
    bedTime: formatTimeTo12Hour(new Date(sleepLogDTO.bed_time)),
    wakeTime: formatTimeTo12Hour(new Date(sleepLogDTO.wake_time)),
    duration: sleepLogDTO.duration,
    efficiency: sleepLogDTO.efficiency,
    awakeMins: sleepLogDTO.awake_mins,
    lightMins: sleepLogDTO.light_mins,
    deepMins: sleepLogDTO.deep_mins,
    remMins: sleepLogDTO.rem_mins,
    skinTemperature: null,
    breathingRate: null,
    hrv: null,
    spo2: null,
  };
};
