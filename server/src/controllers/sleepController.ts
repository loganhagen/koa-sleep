import { Request, Response } from "express";
import { sleepService } from "../services/sleepService";

export const getSleepData = async (req: Request, res: Response) => {
  try {
    const data = await sleepService.getData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sleep data." });
  }
};

export const getAverageSleep = async (req: Request, res: Response) => {
  res.status(200).json({ hi: "there" });
};

export const getSleepEfficiency = async (req: Request, res: Response) => {
  try {
    const data = await sleepService.getEfficiency();
    res.status(200).json({ efficiency: data });
  } catch (error) {
    res.status(500).json({ error: "Error getting sleep efficiency." });
  }
};
