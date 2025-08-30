/**
 * The controller layer is a bridge between the routing and the service layer. Service layer return data will be
 * packaged nicely into HTTP responses and sent back to the user.
 */

import { Request, Response } from "express";
import { sleepService } from "@services/sleepService";

export const sleepController = {
  getSleepLogs: async (req: Request, res: Response) => {
    try {
      const sleepLogs = await sleepService.getSleepLogs();
      res.status(200).json({ sleepLogs: sleepLogs });
    } catch (error) {
      res.status(404).json({ error: "Sleep logs not found" });
    }
  },
  getSleepLogsByUserId: async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ error: "userId query parameter is required." });
      }

      const sleepLogsDTO = await sleepService.getSleepLogByUserId(
        userId as string
      );
      res.status(200).json({ sleepLogs: sleepLogsDTO });
    } catch (error) {
      res.status(404).json({ error: "Sleep logs not found." });
    }
  },
};
