/**
 * The controller layer is a bridge between the routing and the service layer. Service layer return data will be
 * packaged nicely into HTTP responses and sent back to the user.
 */

import { Request, Response } from "express";
import { sleepService } from "@services/sleepService";

const createRequestHandler = (serviceCall: () => Promise<any>) => {
  return async (req: Request, res: Response) => {
    try {
      const data = await serviceCall();
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error && error.message) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  };
};

export const getSleepData = createRequestHandler(sleepService.getData);

export const getSleepEfficiency = createRequestHandler(
  sleepService.getEfficiency
);

export const getSleepStages = createRequestHandler(sleepService.getSleepStages);

export const getSessionSummary = (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: [req.params] });
  } catch (error) {
    res.status(500);
  }
};
