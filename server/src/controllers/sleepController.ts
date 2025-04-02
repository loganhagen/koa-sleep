import { Request, Response } from "express";
import { sleepService } from "../services/sleepService";

export const getSleepData = async (req: Request, res: Response) => {
  try {
    const data = await sleepService.getSleepData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sleep data." });
  }
};
