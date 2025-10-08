import { Request, Response } from "express";
import { sleepService } from "@services/sleepService";
import {
  toCoreMetricsDTO,
  toFullSleepLogDTO,
  toSleepLogDTO,
} from "@utils/mappers";
import { SleepStagesDTO } from "@custom_types/api/sleep";
import { userService } from "@services/userService";
import { sleep_logs } from "@prisma/client";
import { FullSleepLog } from "@custom_types/db/db";

export const sleepController = {
  getFullLogs: async (req: Request, res: Response) => {
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

      const fullLogs: FullSleepLog[] = await userService.getFullSleepLogs(
        userId
      );

      if (!fullLogs) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No full logs found.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: fullLogs.map(toFullSleepLogDTO),
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
  getSleepLogsByUserId: async (req: Request, res: Response): Promise<void> => {
    try {
      const requestedUserId = req.params.userId;

      if (!requestedUserId || typeof requestedUserId !== "string") {
        res.status(400).json({
          success: false,
          error: {
            code: "INVALID_PARAMETER",
            message:
              "The 'userId' URL parameter is required and must be a string.",
          },
        });
        return;
      }

      const sleepLogs = await sleepService.getSleepLogsByUserId(
        requestedUserId
      );

      if (!sleepLogs) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No sleep logs found.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: sleepLogs.map(toSleepLogDTO),
      });
      return;
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

      const sleepLog: sleep_logs | null = await sleepService.getSleepLogByDate(
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

      const data: SleepStagesDTO | null =
        await sleepService.getSleepStagesByDate(userId, new Date(date));

      if (!data) {
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
        data: data,
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
  getSleepSummaryByDate: async (req: Request, res: Response) => {
    try {
      const { userId: requestedUserId, date } = req.params;

      if (!requestedUserId || !date) {
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
        requestedUserId,
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
  getSmartSummaryByDate: async (req: Request, res: Response) => {
    try {
      const { userId: requestedUserId, date } = req.params;

      if (!requestedUserId || !date) {
        res.status(400).json({
          success: false,
          error: {
            code: "INVALID_PARAMETER",
            message: "The 'userId' and 'date' URL parameters are required.",
          },
        });
        return;
      }

      const smart_summary = await sleepService.getSmartSummaryByDate(
        requestedUserId,
        new Date(date)
      );

      if (!smart_summary) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No smart summary found for the specified date.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: smart_summary,
      });
      return;
    } catch (error) {
      console.error("Failed to search for smart summary by date:", error);
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
