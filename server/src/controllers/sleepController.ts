/**
 * The controller layer is a bridge between the routing and the service layer. Service layer return data will be
 * packaged nicely into HTTP responses and sent back to the user.
 */

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

export const getSleepEfficiency = async (req: Request, res: Response) => {
  try {
    const data = await sleepService.getEfficiency();
    res.status(200).json({ efficiency: data });
  } catch (error) {
    res.status(500).json({ error: "Error getting sleep efficiency." });
  }
};
