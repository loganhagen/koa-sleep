/**
 * The service layer features any required business logic to translate API responses into the data required by the controller.
 * No HTTP-related code should be found here.
 */

import { SleepLog } from "@custom_types/api/sleep";
import { SessionSummary, SleepStages } from "@custom_types/backend/sleep";
import { sleepApiClient } from "@external/apiClient";
import { millisecondsToHours } from "@utils/converters";

// The object containing methods for the controller to use.
export const sleepService = {
  /**
   *
   * @summary Gets the full sleep data API response.
   */
  getData: async () => {
    const apiData = await sleepApiClient.getSleepData();
    return apiData;
  },

  /**
   * @summary Calculates and returns the average sleep efficiency for up to the last 7 sleep records.
   */
  getEfficiency: async () => {
    const apiData = await sleepApiClient.getSleepData();
    const sleepData = apiData.sleep;
    let totalEfficiency = 0;
    const recentData = sleepData.slice(0, 7);
    recentData.forEach((record: any) => {
      totalEfficiency = totalEfficiency + record.efficiency;
    });
    let averageEfficiency = totalEfficiency / recentData.length;
    return averageEfficiency;
  },

  getSleepStages: async () => {
    const sleepLogs = await getSleepLogs();
    const mostRecentLog = getMostRecentLog(sleepLogs);

    if (mostRecentLog.type == "stages") {
      const summary = mostRecentLog.levels.summary;

      const sleepStages: SleepStages = {
        deep: summary.deep.minutes,
        light: summary.light.minutes,
        rem: summary.rem.minutes,
        wake: summary.wake.minutes,
      };

      return sleepStages;
    }

    throw new Error("Sleep stages not available.");
  },

  getSessionSummary: async (target: string) => {
    const sleepLogs = await getSleepLogs();
    const foundLog = sleepLogs.find((log) => {
      const logDate = new Date(log.dateOfSleep).toDateString();
      return logDate == target;
    });

    if (foundLog) {
      return summarizeLog(foundLog);
    }

    return null;
  },

  // TO-DO
  getDeviation: async () => {
    const sleepLogs = await getSleepLogs();
    const recentLogs = getLastWeekOfLogs(sleepLogs);
    let times: number[] = [];
    recentLogs.forEach((log) => {
      times.push(convertTimeToSeconds(log.startTime));
    });
    return {
      data: {
        times: times,
      },
    };
  },
};

const summarizeLog = (log: SleepLog): SessionSummary => {
  return {
    duration: millisecondsToHours(log.duration),
    startTime: log.startTime,
    endTime: log.endTime,
  };
};

const getMostRecentLog = (logs: SleepLog[]) => {
  return logs[logs.length - 1];
};

const getSleepLogs = async () => {
  const apiData = await sleepApiClient.getSleepData();
  return apiData.sleep;
};

// TO-DO
const calcDeviation = (logs: SleepLog[]) => {
  let deviation: number = 0;

  logs.forEach((log) => {
    deviation = deviation + convertTimeToSeconds(log.startTime);
  });

  return deviation;
};

const convertTimeToSeconds = (startTime: string) => {
  let date = new Date(startTime);
  let hours = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();

  return hours * 3600 + mins * 60 + secs;
};

const getLastWeekOfLogs = (logs: SleepLog[]) => {
  return logs.slice(0, 7);
};

// The logs are sorted by most recent.
const sortLogsByDate = (logs: SleepLog[]) => {
  const sortedLogs = logs.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
  return sortedLogs;
};
