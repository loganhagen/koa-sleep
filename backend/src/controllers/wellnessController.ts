import { Request, Response } from "express";
import { skinTempService } from "@services/skinTempService";
import { toSkinTempDTO } from "@utils/mappers";

export const wellnessController = {
  getSkinTempLogs: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ error: "Missing required argument: userId" });
      } else {
        const logs = await skinTempService.getTemperatureLogs(userId as string);
        res.status(200).json({ logs: logs.map(toSkinTempDTO) });
      }
    } catch (error) {
      console.error("Failed to fetch skin temperature logs:", error);
      res
        .status(500)
        .json({ error: "An unexpected error occurred on the server." });
    }
  },

  getSkinTempLogByDate: async (req: Request, res: Response) => {
    try {
      const { userId, date } = req.params;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ error: "Missing required argument: userId" });
      } else if (!date || typeof date !== "string") {
        res.status(400).json({ error: "Missing required argument: date" });
      } else {
        const log = await skinTempService.getTemperatureLogByDate(
          userId as string,
          new Date(date)
        );

        if (!log) {
          res.status(404).json({
            message: "No skin temperature log found for the specified date.",
          });
        } else {
          res.status(200).json({ log: toSkinTempDTO(log) });
        }
      }
    } catch (error) {
      console.error(
        "Failed to search for skin temperature log by date:",
        error
      );
      res
        .status(500)
        .json({ error: "An unexpected error occurred on the server." });
    }
  },
};
