/**
 * The service layer features any required business logic to translate API responses into the data required by the controller.
 * No HTTP-related code should be found here.
 */

import {
  SleepSummary,
  SleepStages,
  WeeklySleepStats,
  LastNightSleep,
} from "@custom_types/backend/sleep";
import { sleepApiClient } from "@external/apiClient";
import { cacheService } from "@utils/cacheService";
import { SleepKey } from "@utils/constants";
import { convertMinutesToHHMM } from "@utils/converters";
import {
  summarizeLog,
  calculateSleepStats,
  sortLogsByDate,
} from "@utils/sleep";

export const sleepService = {
  /**
   *
   * @summary Gets the full sleep data API response.
   */
  getData: async () => {
    const apiData = await sleepApiClient.getMockSleepData();
    return apiData;
  },

  /**
   * @summary Calculates and returns the average sleep efficiency for up to the last 7 sleep records.
   */
  getEfficiency: async () => {
    const apiData = await sleepApiClient.getMockSleepData();
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
    const apiData = await sleepApiClient.getMockSleepData();
    const sleepLogs = apiData.sleep;
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
    const apiData = await sleepApiClient.getMockSleepData();
    const sleepLogs = apiData.sleep;
    const foundLog = sleepLogs.find((log) => {
      const logDate = new Date(log.dateOfSleep).toDateString();
      return logDate == target;
    });

    if (foundLog) {
      return summarizeLog(foundLog);
    }

    return null;
  },

  getLastNightSleep: async (): Promise<LastNightSleep> => {
    try {
      const cacheString = cacheService.get("lhagen", "recent-data");
      if (cacheString) {
        return JSON.parse(cacheString) as LastNightSleep;
      }
    } catch (error) {
      console.log("Unable to retrieve or parse cache data.");
    }

    const apiData = await sleepApiClient.getMockSleepData();

    if (!apiData?.sleep?.length) {
      throw new Error("No sleep data returned from API.");
    }

    const sortedLogs = sortLogsByDate(apiData.sleep);
    const lastLog = sortedLogs[0];

    if (!lastLog) {
      throw new Error("Failed to get most recent sleep log.");
    }

    const data: LastNightSleep = {
      totalSleep: convertMinutesToHHMM(lastLog.minutesAsleep),
      bedtime: new Date(lastLog.startTime).toLocaleTimeString(),
      sleepScore: lastLog.efficiency.toString(),
    };

    try {
      cacheService.set("lhagen", "recent-data", JSON.stringify(data));
    } catch (error) {
      console.log("Failed to save data to cache");
    }

    return data;
  },

  /**
   *
   * @returns A WeeklySleepStats object containing a few descriptive stats.
   */
  getSleepStats: async (): Promise<WeeklySleepStats> => {
    const apiData = await sleepApiClient.getMockSleepData();
    const sleepLogs = apiData.sleep;
    const recentLogs = sortLogsByDate(sleepLogs).slice(0, 7);
    const summarizedLogs: SleepSummary[] = [];
    recentLogs.forEach((log) => {
      summarizedLogs.push(summarizeLog(log));
    });

    const wakeTimeStats = calculateSleepStats(summarizedLogs, SleepKey.End);
    const bedTimeStats = calculateSleepStats(summarizedLogs, SleepKey.Start);
    return {
      wakeTimeStats,
      bedTimeStats,
    };
  },
};
