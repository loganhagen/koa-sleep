import { Request, Response } from "express";
import { userService } from "@services/userService";
import { User } from "@custom_types/api/user";

export const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const allUsers = await userService.getAllUsers();
      res.status(200).json({ users: allUsers });
    } catch (error) {
      res.status(404);
    }
  },
  getUserByEmail: async (req: Request, res: Response) => {
    try {
      const { userEmail } = req.query;
      if (!userEmail || typeof userEmail !== "string") {
        res
          .status(400)
          .json({ error: "userEmail query parameter is required." });
      }

      const userRecord = await userService.getUserByEmail(userEmail as string);
      if (!userRecord) {
        throw new Error();
      }

      const userDTO: User = {
        id: userRecord.id,
        email: userRecord.email,
        firstName: userRecord.firstName,
        lastName: userRecord.lastName,
      };

      console.log(userDTO);
      res.status(200).json({ user: userDTO });
    } catch (error) {
      res.status(404).json({ error: `Unable to find user.` });
    }
  },
};
