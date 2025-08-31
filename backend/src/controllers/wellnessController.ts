import { Request, Response } from "express";
import { wellnessService } from "@services/wellnessService";
import { toBreathingRateDTO, toSkinTempDTO } from "@utils/mappers";

export const wellnessController = {
  getSkinTempLogs: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(400).json({
          success: false,
          error: {
            code: "INVALID_PARAMETER",
            message: "The 'userId' URL parameter is required.",
          },
        });
        return;
      }

      const logs = await wellnessService.getTemperatureLogs(userId);
      res.status(200).json({
        success: true,
        data: logs.map(toSkinTempDTO),
      });
      return;
    } catch (error) {
      console.error("Failed to fetch skin temperature logs:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred on the server.",
        },
      });
      return;
    }
  },

  getSkinTempLogByDate: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, date } = req.params;
      if (!userId || !date) {
        res.status(400).json({
          success: false,
          error: {
            code: "INVALID_PARAMETER",
            message: "The 'userId' and 'date' URL parameters are required.",
          },
        });
        return;
      }

      const log = await wellnessService.getTemperatureLogByDate(
        userId,
        new Date(date)
      );

      if (!log) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No skin temperature log found for the specified date.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: toSkinTempDTO(log),
      });
      return;
    } catch (error) {
      console.error(
        "Failed to search for skin temperature log by date:",
        error
      );
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred on the server.",
        },
      });
      return;
    }
  },
  getBreathingRateByDate: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { userId, date } = req.params;
      if (!userId || !date) {
        res.status(400).json({
          success: false,
          error: {
            code: "INVALID_PARAMETER",
            message: "The 'userId' and 'date' URL parameters are required.",
          },
        });
        return;
      }

      const log = await wellnessService.getBreathingRateByDate(
        userId,
        new Date(date)
      );

      if (!log) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No breathing rate found for the specified date.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: toBreathingRateDTO(log),
      });
      return;
    } catch (error) {
      console.error("Failed to search for breathing rate log by date:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred on the server.",
        },
      });
      return;
    }
  },
};
