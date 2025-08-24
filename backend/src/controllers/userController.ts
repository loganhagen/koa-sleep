import { Request, Response } from "express";
import { userService } from "@services/userService";

export const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const allUsers = await userService.getAllUsers();
      res.status(200).json({ data: allUsers });
    } catch (error) {
      res.status(404);
    }
  },
  getDemoUser: async (req: Request, res: Response) => {
    try {
      const demoUser = await userService.getDemoUser();
      res.status(200).json({ data: demoUser });
    } catch (error) {
      res.status(404);
    }
  },
};
