import {
  millisecondsToHoursAndMinutes,
  formatTimeTo12Hour,
} from "@/utils/utils";
import { useSleepLogByDate } from "./useSleepLogs";

export const useCoreMetrics = (
  userId: string | undefined,
  targetDate: string
) => {
  const {
    data: sleepLog,
    isLoading,
    error,
  } = useSleepLogByDate(userId, targetDate);

  if (!sleepLog) {
    return { metrics: null, isLoading, error };
  }
  const [hours, minutes] = millisecondsToHoursAndMinutes(sleepLog.duration);
  const metrics = {
    bedtime: formatTimeTo12Hour(new Date(sleepLog.startTime)),
    wakeup: formatTimeTo12Hour(new Date(sleepLog.endTime)),
    totalSleep: `${hours}h ${minutes}m`,
    efficiency: `${sleepLog.efficiency}%`,
  };

  return { metrics, isLoading, error };
};
