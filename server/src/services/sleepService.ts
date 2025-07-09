/**
 * The service layer features any required business logic to translate API responses into the data required by the controller.
 * No HTTP-related code should be found here.
 */

import { SleepLog, StagesSleepLog } from "../../../types/api/sleep";
import { sleepApiClient } from "../external/apiClient";

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
    const apiData = await sleepApiClient.getSleepData();
    const sleepLogs: SleepLog[] = apiData.sleep;
    const mostRecentLog = sleepLogs[sleepLogs.length - 1];

    if (mostRecentLog.type == "stages") {
      const summary = mostRecentLog.levels.summary;
      return summary;
    }

    throw new Error("Sleep stages not available.");
  },
};
