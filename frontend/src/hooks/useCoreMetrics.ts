import {
  millisecondsToHoursAndMinutes,
  formatTimeTo12Hour,
} from "@/utils/utils";
import { useSleepLogByDate } from "./useSleepLogs";
import { useMemo } from "react";

export const useCoreMetrics = (
  userId: string | undefined,
  targetDate: string
) => {
  const {
    data: sleepLog,
    isLoading,
    error,
  } = useSleepLogByDate(userId, targetDate);

  const metrics = useMemo(() => {
    if (!sleepLog) {
      return null;
    }

    const [hours, minutes] = millisecondsToHoursAndMinutes(sleepLog.duration);
    return {
      bedtime: formatTimeTo12Hour(new Date(sleepLog.startTime)),
      wakeup: formatTimeTo12Hour(new Date(sleepLog.endTime)),
      totalSleep: `${hours}h ${minutes}m`,
      efficiency: `${sleepLog.efficiency}%`,
    };
  }, [sleepLog]);

  return { metrics, isLoading, error };
};
