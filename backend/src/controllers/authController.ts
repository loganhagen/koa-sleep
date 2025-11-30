import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userService } from "@services/userService";

export const authController = {
  callback: async (req: Request, res: Response) => {
    const { code, error } = req.query;

    if (error) {
      console.log("User denied Fitbit access.");
      return res.redirect("/");
    }

    if (!code || typeof code !== "string") {
      return res.status(400).send("Missing authorization code");
    }

    try {
      const tokens = await exchangeCodeForTokens(code);

      const user = await userService.getUserByEmail("demo@koa");
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

      res.redirect("/home");
    } catch (error) {
      console.error("Error in mock callback:", error);
      res.redirect("/");
    }
  },
};

const exchangeCodeForTokens = async (code: string) => {
  if (code != "MOCK_CODE_12345") {
    throw new Error("Invalid code");
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockTokenResponse = {
    access_token: "MOCK_ACCESS_TOKEN",
    refresh_token: "MOCK_REFRESH_TOKEN",
    expires_in: 28800,
    user_id: "MOCK_FITBIT_USER_ID",
  };

  return mockTokenResponse;
};
