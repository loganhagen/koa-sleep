import { Request, Response } from "express";
import { userService } from "@services/userService";
import { UserDTO } from "@custom_types/api/user";
import { toUserDTO } from "@utils/mappers";

export const userController = {
  getDemoUser: async (req: Request, res: Response) => {
    try {
      const demoUser = await userService.getDemoUser();

      if (!demoUser) {
        throw new Error();
      }

      res.status(200).json({ user: toUserDTO(demoUser) });
    } catch (error) {
      res.status(404).json({ error: "Unable to retrieve demo user." });
    }
  },
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
      const { email } = req.params;
      if (!email || typeof email !== "string") {
        res
          .status(400)
          .json({ error: "email parameter is required." });
      }

      const userRecord = await userService.getUserByEmail(email as string);
      if (!userRecord) {
        throw new Error();
      }

      const userDTO: UserDTO = {
        id: userRecord.id,
        email: userRecord.email,
        firstName: userRecord.firstName,
        lastName: userRecord.lastName,
      };

      res.status(200).json({ user: userDTO });
    } catch (error) {
      res.status(404).json({ error: `Unable to find user.` });
    }
  },
};
