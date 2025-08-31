import { Request, Response } from "express";
import { sleepService } from "@services/sleepService";
import { toSleepLogDTO } from "@utils/mappers";

export const sleepController = {
  getSleepLogs: async (req: Request, res: Response) => {
    try {
      const sleepLogs = await sleepService.getSleepLogs();
      res.status(200).json({ data: sleepLogs });
    } catch (error) {
      console.error("Failed to fetch sleep logs:", error);
      res
        .status(500)
        .json({ error: "An unexpected error occurred on the server." });
    }
  },

  getSleepLogsByUserId: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ error: "userId parameter is required." });
      } else {
        const sleepLogs = await sleepService.getSleepLogsByUserId(
          userId as string
        );
        res.status(200).json({ data: sleepLogs });
      }
    } catch (error) {
      console.error("Failed to fetch sleep logs by user ID:", error);
      res
        .status(500)
        .json({ error: "An unexpected error occurred on the server." });
    }
  },

  getSleepLogByDate: async (req: Request, res: Response) => {
    try {
      const { userId, date } = req.params;
      if (
        !userId ||
        typeof userId !== "string" ||
        !date ||
        typeof date !== "string"
      ) {
        res
          .status(400)
          .json({ error: "Missing or invalid required arguments." });
      } else {
        const sleepLog = await sleepService.getSleepLogByDate(
          userId as string,
          new Date(date)
        );

        if (!sleepLog) {
          res
            .status(404)
            .json({ message: "No sleep log found for the specified date." });
        } else {
          res.status(200).json({ data: toSleepLogDTO(sleepLog) });
        }
      }
    } catch (error) {
      console.error("Failed to search for sleep log by date:", error);
      res
        .status(500)
        .json({ error: "An unexpected error occurred on the server." });
    }
  },

  getMostRecentSleepLog: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ error: "Missing or invalid userId argument." });
      } else {
        const sleepLog = await sleepService.getMostRecentSleepLog(userId);

        if (!sleepLog) {
          res
            .status(404)
            .json({ message: "No recent sleep log found for this user." });
        } else {
          res.status(200).json({ data: toSleepLogDTO(sleepLog) });
        }
      }
    } catch (error) {
      console.error("Failed to search for most recent sleep log:", error);
      res
        .status(500)
        .json({ error: "An unexpected error occurred on the server." });
    }
  },
};
