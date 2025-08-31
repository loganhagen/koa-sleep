import { Request, Response } from "express";
import { skinTempService } from "@services/skinTempService";
import { toSkinTempDTO } from "@utils/mappers";

export const wellnessController = {
  getSkinTempLogs: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ error: "Missing required argument." });
      }
      const logs = await skinTempService.getTemperatureLogs(userId as string);
      res.status(200).json({ logs: logs.map(toSkinTempDTO) });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skin temperature logs." });
    }
  },
  getSkinTempLogByDate: async (req: Request, res: Response) => {
    try {
      const { userId, date } = req.params;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({ error: "Missing required argument: userId" });
      }
      if (!date || typeof date !== "string") {
        res.status(400).json({ error: "Missing required argument: date" });
      }
      const log = await skinTempService.getTemperatureLogByDate(
        userId as string,
        new Date(date)
      );

      if (!log) {
        throw new Error("No log found.");
      }

      res.status(200).json({ log: toSkinTempDTO(log) });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to search for temperature log." });
    }
  },
};
