import { userService } from "@services/userService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await userService.getUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
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
