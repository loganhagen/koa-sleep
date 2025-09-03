import { Request, Response } from "express";
import { userService } from "@services/userService";
import { toUserDTO } from "@utils/mappers";

export const userController = {
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

      const userRecord = await userService.getUserByEmail(email);

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
