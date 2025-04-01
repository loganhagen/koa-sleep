import { Request, Response } from "express";
import { fetchSleepData } from "../services/sleepService";

export const getSleepData = async (req: Request, res: Response) => {
  console.log();
  try {
    const data = await fetchSleepData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

