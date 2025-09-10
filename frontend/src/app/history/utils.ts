import { FullSleepLogDTO } from "@/types/api/sleep";
import { formatTimeTo12Hour } from "@/utils/utils";
import { GridRowsProp } from "@mui/x-data-grid";

export const mapSleepLogsToGridRows = (
  sleepLogs: FullSleepLogDTO[] | undefined
): GridRowsProp => {
  if (!sleepLogs) {
    return [];
  }

  return sleepLogs.map((log) => ({
    id: log.id,
    date: log.date,
    bedtime: formatTimeTo12Hour(new Date(log.bed_time)),
    wakeUpTime: formatTimeTo12Hour(new Date(log.wake_time)),
    totalSleep: log.duration,
    awake: `${log.awake_mins}m`,
    rem: `${log.rem_mins}m`,
    light: `${log.light_mins}m`,
    deep: `${log.deep_mins}m`,
    efficiency: log.efficiency,
    skinTemperature: log.skin_temperature,
    breathingRate: log.breathing_rate,
    hrv: log.hrv,
    spo2: log.spo2,
  }));
};
