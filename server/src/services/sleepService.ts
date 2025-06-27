import { SleepCardState } from "../../../types/ui/sleep";
import {
  FitbitSleepResponse,
  SleepData,
  SleepSummary,
} from "../../../types/api/sleep";
import { millisecondsToHours } from "../utils/converters";
import { sleepApiClient } from "../external/apiClient";

export const sleepService = {
  getSleepCardState: async (): Promise<SleepCardState | { error: string }> => {
    try {
      const apiData = await sleepApiClient.getSleepData();
      return createSleepCardState(apiData);
    } catch (error) {
      return { error: "Failed to process sleep data." };
    }
  },
  getData: async () => {
    try {
      const apiData = await sleepApiClient.getSleepData();
      return apiData;
    } catch (error) {
      return { error: "Failed to process sleep data." };
    }
  },
  /**
   * @summary Calculates and returns the average sleep efficiency for up to the last 7 sleep records.
   */
  getEfficiency: async () => {
    const apiData = await sleepApiClient.getSleepData();
    const sleepData = apiData.sleep;
    const recentData = sleepData.slice(0, 7);
    let totalEfficiency = 0;
    recentData.forEach((record: any) => {
      totalEfficiency = totalEfficiency + record.efficiency;
    });
    let AverageEfficiency = totalEfficiency / recentData.length;
    return { sleepEfficiency: AverageEfficiency };
  },
};

// Creates the data needed by the front-end to display sleep data.
const createSleepCardState = (
  sleepResponse: FitbitSleepResponse
): SleepCardState => {
  if (
    !sleepResponse ||
    !sleepResponse.sleep ||
    sleepResponse.sleep.length === 0 ||
    !sleepResponse.summary
  ) {
    throw new Error("Invalid sleep response data.");
  }

  const data = sleepResponse.sleep[0] as SleepData;
  const summary = sleepResponse.summary as SleepSummary;

  return {
    duration: millisecondsToHours(data.duration),
    efficiency: data.efficiency,
    wake: summary.stages.wake,
    light: summary.stages.light,
    deep: summary.stages.deep,
  };
};
