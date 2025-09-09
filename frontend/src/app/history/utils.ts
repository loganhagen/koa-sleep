import { SleepLog } from "@/types/ui/sleep";
import { GridRowsProp } from "@mui/x-data-grid";

export const mapSleepLogsToGridRows = (
  sleepLogs: SleepLog[] | undefined
): GridRowsProp => {
  if (!sleepLogs) {
    return [];
  }

  return sleepLogs.map((log) => ({
    id: log.id,
    date: log.dateTime,
    bedtime: log.bedTime,
    wakeUpTime: log.wakeTime,
    totalSleep: log.duration,
    awake: `${log.awakeMins}m`,
    rem: `${log.remMins}m`,
    light: `${log.lightMins}m`,
    deep: `${log.deepMins}m`,
    efficiency: log.efficiency,
    skinTemperature: log.skinTemperature,
    breathingRate: log.breathingRate,
    hrv: log.hrv,
    spo2: log.spo2,
  }));
};
