/**
 * The controller layer is a bridge between the routing and the service layer. Service layer return data will be
 * packaged nicely into HTTP responses and sent back to the user.
 */

import { Request, Response } from "express";
import { sleepService } from "@services/sleepService";

// Generic request handler function factory.
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

export const sleepController = {
  getSleepData: createRequestHandler(sleepService.getData),
  getSleepEfficiency: createRequestHandler(sleepService.getCurrentUser),
  getSleepStages: createRequestHandler(sleepService.getSleepStages),
  getSessionSummary: async (req: Request, res: Response) => {
    try {
      const targetDate = new Date(req.params.date);
      if (isNaN(targetDate.valueOf())) {
        throw new Error("Invalid Date");
      }

      const serviceRes = await sleepService.getSessionSummary(
        targetDate.toDateString()
      );

      if (serviceRes == null) {
        throw new Error("Sleep log not found for provided date.");
      }

      res.status(200).json({ serviceRes });
    } catch (error) {
      if (error instanceof Error && error.message) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  },
  getSleepStats: createRequestHandler(sleepService.getSleepStats),
  getLastNightSleep: createRequestHandler(sleepService.getLastNightSleep),
};
