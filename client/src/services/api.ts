import {
  SleepResponse,
  Sleep,
  Summary,
  SleepData,
} from "../../types/api/sleep";
import { millisecondsToHours, minutesToHours } from "../../utils/utils";

export const fitbitApiService = {
  fetchSleepData: async (): Promise<SleepData> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await fetch("http://localhost:3000/sleep-endpoint");
    const res = (await data.json()) as SleepResponse;
    const sleep = res.sleep as Sleep[];
    const summary = res.summary as Summary;
    const sleepData: SleepData = {
      duration: millisecondsToHours(sleep[0].duration),
      efficiency: sleep[0].efficiency,
      wake: minutesToHours(summary.stages.wake),
      light: minutesToHours(summary.stages.light),
      deep: minutesToHours(summary.stages.deep),
    };
    return sleepData;
  },
};
