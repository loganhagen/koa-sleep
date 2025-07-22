import { SleepLog } from "@custom_types/api/sleep";
import { SleepSummary, SleepStats } from "@custom_types/backend/sleep";
import { sleepApiClient } from "@external/apiClient";
import {
  mean,
  standardDeviation,
  coefficientOfVariation,
} from "simple-statistics";
import { millisecondsToHours } from "./converters";

export const calculateSleepStats = (
  summarizedLogs: SleepSummary[],
  quantityKey: "startTimeQuantity" | "endTimeQuantity"
): SleepStats => {
  const logTimes = summarizedLogs.map((log) => log[quantityKey]);
  const dataMean = mean(logTimes);
  const dataStdDev = standardDeviation(logTimes);
  const deviationInMins = 60 * dataStdDev;
  const coeffOfVar = coefficientOfVariation(logTimes);

  return {
    mean: dataMean,
    standardDeviation: dataStdDev,
    deviationInMins: deviationInMins,
    coefficientOfVariation: coeffOfVar,
  };
};

/**
 *
 * @param log
 * @returns Returns the most pertinent top-level data from a sleep log.
 */
export const summarizeLog = (log: SleepLog): SleepSummary => {
  let startTime = new Date(log.startTime + "Z");
  let endTime = new Date(log.endTime + "Z");

  let startTimeDay = startTime.getUTCDay();
  let endTimeDay = endTime.getUTCDay();

  let startTimeQuantity = 0;
  let endTimeQuantity = endTime.getUTCHours() + endTime.getUTCMinutes() / 60;

  // If the sleep log starts after midnight, we must make an adjustment to the quantity calculation.
  if (startTimeDay == endTimeDay) {
    startTimeQuantity =
      24 + startTime.getUTCHours() + startTime.getUTCMinutes() / 60;
  } else {
    startTimeQuantity =
      startTime.getUTCHours() + startTime.getUTCMinutes() / 60;
  }

  return {
    duration: millisecondsToHours(log.duration),
    startTime: startTime,
    startTimeQuantity: startTimeQuantity,
    endTime: endTime,
    endTimeQuantity: endTimeQuantity,
  };
};

export const getSleepLogs = async () => {
  const apiData = await sleepApiClient.getSleepData();
  return apiData.sleep;
};

/**
 * Sort logs by most recent.
 * @param logs
 * @returns
 */
export const sortLogsByDate = (logs: SleepLog[]) => {
  const sortedLogs = logs.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
  return sortedLogs;
};
