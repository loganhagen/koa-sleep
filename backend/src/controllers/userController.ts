import { Request, Response } from "express";
import { userService } from "@services/userService";
import { toUserDTO } from "@utils/mappers";
import { users } from "@prisma/client";
import { AuthenticatedRequest } from "middleware/authMiddleware";

export const userController = {
  getCurrentUser: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const authenticatedUserId = req.user!.userId;

      const userRecord = await userService.getUserById(authenticatedUserId);

      if (!userRecord) {
        res.status(404).json({
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: `User not found.`,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: toUserDTO(userRecord),
      });
    } catch (error) {
      console.error("Failed to retrieve user by id:", error);
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
  getUserByEmail: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.params;
      if (!email || typeof email !== "string") {
        res.status(400).json({
          success: false,
          error: {
            code: "INVALID_PARAMETER",
            message:
              "The 'email' URL parameter is required and must be a string.",
          },
        });
        return;
      }

      const userRecord: users | null = await userService.getUserByEmail(email);

      if (!userRecord) {
        res.status(404).json({
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: `User with email '${email}' not found.`,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: toUserDTO(userRecord),
      });
      return;
    } catch (error) {
      console.error("Failed to retrieve user by email:", error);
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
