import { Request, Response } from "express";
import { sleepService } from "../services/sleepService";
import { SleepData } from "../../../types/api/sleep";

export const getSleepData = async (req: Request, res: Response) => {
  try {
    const data = await sleepService.getSleepData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sleep data." });
  }
};

export const getAverageSleep = async (req: Request, res: Response) => {
  res.status(200).json({ hi: "there" });
};

/**
 * @summary Calculates and returns the average sleep efficiency for up to the last 7 sleep records.
 */
export const getAverageEfficiency = async (req: Request, res: Response) => {
  try {
    const data = await sleepService.getSleepData();

    if ("error" in data) {
      res.status(500).json({ error: data.error });
    } else {
      const sleepData = data.sleep;
      const recentData = sleepData.slice(0, 7);
      let totalEfficiency = 0;
      recentData.forEach((record) => {
        totalEfficiency = totalEfficiency + record.efficiency;
      });
      let getAverageEfficiency = totalEfficiency / recentData.length;

      res.status(200).json({ efficiency: getAverageEfficiency });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error calculating average sleep efficiency." });
  }
};
