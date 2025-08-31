import { Request, Response } from "express";
import { userService } from "@services/userService";
import { toUserDTO } from "@utils/mappers";

export const userController = {
  getDemoUser: async (req: Request, res: Response) => {
    try {
      const demoUser = await userService.getDemoUser();

      if (!demoUser) {
        res.status(404).json({ message: "Demo user not found." });
      } else {
        res.status(200).json({ user: toUserDTO(demoUser) });
      }
    } catch (error) {
      console.error("Failed to retrieve demo user:", error);
      res
        .status(500)
        .json({ error: "An unexpected error occurred on the server." });
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const allUsers = await userService.getAllUsers();
      res.status(200).json({ users: allUsers.map(toUserDTO) });
    } catch (error) {
      console.error("Failed to retrieve all users:", error);
      res
        .status(500)
        .json({ error: "An unexpected error occurred on the server." });
    }
  },

  getUserByEmail: async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      if (!email || typeof email !== "string") {
        res.status(400).json({ error: "email parameter is required." });
      } else {
        const userRecord = await userService.getUserByEmail(email as string);

        if (!userRecord) {
          res.status(404).json({ message: "User with that email not found." });
        } else {
          res.status(200).json({ user: toUserDTO(userRecord) });
        }
      }
    } catch (error) {
      console.error("Failed to retrieve user by email:", error);
      res
        .status(500)
        .json({ error: "An unexpected error occurred on the server." });
    }
  },
};
