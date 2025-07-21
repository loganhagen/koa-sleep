/**
 * The service layer features any required business logic to translate API responses into the data required by the controller.
 * No HTTP-related code should be found here.
 */

import { SleepLog } from "@custom_types/api/sleep";
import {
  SleepSummary,
  SleepStages,
  SleepStats,
  WeeklySleepStats,
} from "@custom_types/backend/sleep";
import { sleepApiClient } from "@external/apiClient";
import { millisecondsToHours } from "@utils/converters";
import {
  coefficientOfVariation,
  mean,
  standardDeviation,
} from "simple-statistics";

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
    const mostRecentLog = sleepLogs[sleepLogs.length - 1];

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

  /**
   *
   * @returns An object containing the mean, standard deviation, deviation in minutes, and coefficient of variation for
   * the last week of bedtime and waketime values.
   */
  getSleepStats: async (): Promise<WeeklySleepStats> => {
    const sleepLogs = await getSleepLogs();
    const recentLogs = sortLogsByDate(sleepLogs).slice(0, 7);
    const summarizedLogs: SleepSummary[] = [];
    recentLogs.forEach((log) => {
      summarizedLogs.push(summarizeLog(log));
    });

    let wakeTimeStats = getWakeTimeStats(summarizedLogs);
    let bedTimeStats = undefined;

    return {
      bedTimeStats: bedTimeStats,
      wakeTimeStats: wakeTimeStats,
    };
  },
};

const getWakeTimeStats = (summarizedLogs: SleepSummary[]): SleepStats => {
  let wakeTimes = summarizedLogs.map((log) => log.endTimeQuantity);
  let meanWakeTime = mean(wakeTimes);
  let wakeTimeDev = standardDeviation(wakeTimes);
  let deviationToMins = 60 * wakeTimeDev;
  let wakeTimeCoeff = coefficientOfVariation(wakeTimes);

  return {
    mean: meanWakeTime,
    standardDeviation: wakeTimeDev,
    deviationInMins: deviationToMins,
    coefficientOfVariation: wakeTimeCoeff,
  };
};

/**
 *
 * @param log
 * @returns Returns the most pertinent top-level data from a sleep log.
 */
const summarizeLog = (log: SleepLog): SleepSummary => {
  let startTime = new Date(log.startTime + "Z");
  let endTime = new Date(log.endTime + "Z");

  let [startTimeQuantity, endTimeQuantity] = [
    startTime.getUTCHours() + startTime.getUTCMinutes() / 60,
    endTime.getUTCHours() + endTime.getUTCMinutes() / 60,
  ];
  return {
    duration: millisecondsToHours(log.duration),
    startTime: startTime,
    startTimeQuantity: startTimeQuantity,
    endTime: endTime,
    endTimeQuantity: endTimeQuantity,
  };
};

const getSleepLogs = async () => {
  const apiData = await sleepApiClient.getSleepData();
  return apiData.sleep;
};

/**
 * Sort logs by most recent.
 * @param logs
 * @returns
 */
const sortLogsByDate = (logs: SleepLog[]) => {
  const sortedLogs = logs.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
  return sortedLogs;
};
