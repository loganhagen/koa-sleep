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
};
