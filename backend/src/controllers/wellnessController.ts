import { Request, Response } from "express";
import { wellnessService } from "@services/wellnessService";
import { toWellnessSummaryDTO } from "@utils/mappers";

export const wellnessController = {
  getWellnessSummaryByDate: async (
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

      const summary = await wellnessService.getWellnessSummaryByDate(
        userId,
        new Date(date)
      );

      if (!summary) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "No wellness data found for the specified date.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: toWellnessSummaryDTO(summary),
      });
    } catch (error) {
      console.error("Failed to fetch wellness summary:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred on the server.",
        },
      });
    }
  },
};
