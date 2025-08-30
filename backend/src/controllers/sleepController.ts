/**
 * The controller layer is a bridge between the routing and the service layer. Service layer return data will be
 * packaged nicely into HTTP responses and sent back to the user.
 */

import { Request, Response } from "express";
import { sleepService } from "@services/sleepService";
import { toSleepLogDTO } from "@utils/mappers";

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
      const { userId } = req.params;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ error: "userId parameter is required." });
      }

      const sleepLogsDTO = await sleepService.getSleepLogsByUserId(
        userId as string
      );
      res.status(200).json({ sleepLogs: sleepLogsDTO });
    } catch (error) {
      res.status(404).json({ error: "Sleep logs not found." });
    }
  },
  getSleepLogByDate: async (req: Request, res: Response) => {
    try {
      const { userId, date } = req.params;

      if (!userId || !date) {
        res.status(400).json({ error: "Missing required arguments." });
      }
      if (typeof userId !== "string" || typeof date !== "string") {
        res.status(400).json({ error: "Error unpacking arguments." });
      }

      const sleepLog = await sleepService.getSleepLogByDate(
        userId as string,
        date as string
      );

      if (!sleepLog) {
        throw new Error("Sleep log not found.");
      }

      res.status(200).json({ sleepLog: toSleepLogDTO(sleepLog) });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      }
      res.status(404).json({ error: "Failed to search for sleep log." });
    }
  },
};
