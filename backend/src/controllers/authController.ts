import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userService } from "@services/userService";
import { fitbitService } from "@services/fitbitService";
import {
  FitbitTokenResponse,
  FitbitUserProfileResponse,
} from "@custom_types/fitbit/fitbit";

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
      // Get the tokens
      const tokens = await fitbitService.exchangeCodeForTokens(code);
      const user = await userService.findOrCreateFromFitbit(tokens);

      // Sign the JWT
      const webToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      // Create the cookie using the JWT
      res.cookie("auth-token", webToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });

      res.redirect("/home");
    } catch (error) {
      console.error("Error in mock callback:", error);
      res.redirect("/");
    }
  },
  getTokens: async (_: Request, res: Response) => {
    const tokenResponse: FitbitTokenResponse = {
      access_token: "eyJhbGciOiJIUzI1",
      refresh_token: "c643a63c072f0f05478e9d18b991db80ef6061e",
      expires_in: 28800,
      user_id: "GGNJL9",
      token_type: "Bearer",
    };
    res.status(200).send(tokenResponse);
  },
  getProfile: (_: Request, res: Response) => {
    const userProfileResponse: FitbitUserProfileResponse = {
      user: {
        displayName: "love2sleep",
        firstName: "Johnny",
        fullName: "Johnny Snooze",
      },
    };
    res.status(200).send(userProfileResponse);
  },
};
