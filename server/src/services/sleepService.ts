import { SleepCardState } from "../../../types/ui/sleep";
import {
  SleepAPIResponse,
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
      console.log("Error in sleep service: ", error);
      return { error: "Failed to process sleep data." };
    }
  },
  getSleepData: async () => {
    try {
      const apiData = await sleepApiClient.getSleepData();
      return apiData;
    } catch (error) {
      console.log("Error in sleep service: ", error);
      return { error: "Failed to process sleep data." };
    }
  },
};

// Creates the data needed by the front-end to display sleep data.
const createSleepCardState = (
  sleepResponse: SleepAPIResponse
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
