import { userService } from "@services/userService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authController = {
  // Designed for demo use.
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const user = await userService.getUserByEmail(email);
      console.log(user);

      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({ success: true, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
};
