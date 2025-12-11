import { userService } from "@services/userService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const demoController = {
  login: async (_req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.getUserByEmail("demo@koa");
      if (!user) {
        res
          .status(500)
          .send("Demo user not found in database. Please run database seed.");
        return;
      }

      // Signing the token with the user id is "logging in" the user
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.redirect("/home");
    } catch (error) {
      console.error("Error in demo login:", error);
      res.status(500).send("An internal server error occurred.");
    }
  },
  logout: async (_req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie("auth-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.redirect("/");
    } catch (error) {
      console.error("Error in demo logout:", error);
      res.status(500).send("An internal server error occurred.");
    }
  },
};
