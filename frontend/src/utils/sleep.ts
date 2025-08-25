import { SleepLog } from "@custom_types/db/sleep";
import { MostRecentSleep } from "@custom_types/ui/sleep";

export const parseSleepLog = (sleepLog: SleepLog): MostRecentSleep => {
  return {
    date: new Date(sleepLog.dateOfSleep).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    bedtime: formatTime(new Date(sleepLog.startTime)),
    wakeUp: formatTime(new Date(sleepLog.endTime)),
    totalSleep: formatDuration(sleepLog.duration),
    efficiency: sleepLog.efficiency.toString(),
  };
};

/**
 * Formats a date object into a 12-hour time string with AM/PM.
 */
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Converts duration in milliseconds to a "Xh Ym" format.
 */
const formatDuration = (ms: number): string => {
  const totalMinutes = Math.round(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};
