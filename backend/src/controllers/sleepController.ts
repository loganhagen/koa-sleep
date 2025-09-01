import { Request, Response } from "express";
import { sleepService } from "@services/sleepService";
import { toCoreMetricsDTO, toSleepLogDTO } from "@utils/mappers";

export const sleepController = {
  getSleepLogsByUserId: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      if (!userId || typeof userId !== "string") {
        res.status(400).json({
          success: false,
          error: {
            code: "INVALID_PARAMETER",
            message:
              "The 'userId' URL parameter is required and must be a string.",
          },
        });
        return;
      } else {
        const sleepLogs = await sleepService.getSleepLogsByUserId(userId);
        res.status(200).json({
          success: true,
          data: sleepLogs.map(toSleepLogDTO),
        });
        return;
      }
    } catch (error) {
      console.error("Failed to retrieve sleep log by userId", error);
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

  getSleepLogByDate: async (req: Request, res: Response): Promise<void> => {
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

      const sleepLog = await sleepService.getSleepLogByDate(
        userId,
        new Date(date)
      );

      if (!sleepLog) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No sleep log found for the specified date.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: toSleepLogDTO(sleepLog),
      });
      return;
    } catch (error) {
      console.error("Failed to search for sleep log by date:", error);
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

  getMostRecentSleepLog: async (req: Request, res: Response): Promise<void> => {
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

      const sleepLog = await sleepService.getMostRecentSleepLog(userId);

      if (!sleepLog) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No recent sleep log found for this user.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: toSleepLogDTO(sleepLog),
      });
      return;
    } catch (error) {
      console.error("Failed to search for most recent sleep log:", error);
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
  getSleepStagesByDate: async (req: Request, res: Response) => {
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

      const log = await sleepService.getSleepStagesByDate(
        userId,
        new Date(date)
      );

      if (!log) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No sleep log found for the specified date.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: log,
      });
      return;
    } catch (error) {
      console.error("Failed to search for sleep stages by date:", error);
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
  getCoreMetricsByDate: async (req: Request, res: Response) => {
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

      const coreMetrics = await sleepService.getCoreMetricsByDate(
        userId,
        new Date(date)
      );

      if (!coreMetrics) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No core metrics found for the specified date.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: toCoreMetricsDTO(coreMetrics),
      });
      return;
    } catch (error) {
      console.error("Failed to search for core metrics by date:", error);
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
