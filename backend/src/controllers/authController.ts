import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userService } from "@services/userService";
import { fitbitService } from "@services/fitbitService";
import {
  FitbitTokenResponse,
  FitbitUserProfileResponse,
} from "@custom_types/fitbit/fitbit";

export const authController = {
  handleFitbitAuthRedirect: async (_: Request, res: Response) => {
    const fitbitLoginURI = fitbitService.getAuthorizationUrl();
    res.redirect(fitbitLoginURI);
  },
  handleFitbitCallback: async (req: Request, res: Response) => {
    const { code, error, state } = req.query;

    if (error) {
      console.log("User denied Fitbit access.");
      return res.redirect(`${process.env.FRONTEND_URL}/`);
    }

    if (!code || typeof code !== "string") {
      return res.status(400).send("Missing authorization code");
    }

    try {
      // Get the tokens
      const tokens = await fitbitService.exchangeCodeForTokens(code);
      // Get the user or create if new
      const user = await userService.findOrCreateFromFitbit(tokens);

      // Sign the JWT
      const webToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      // Create the cookie using the JWT
      res.cookie("auth-token", webToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000,
      });

      res.redirect(`${process.env.FRONTEND_URL}/home`);
    } catch (error) {
      console.error("Error in mock callback:", error);
      res.redirect(`${process.env.FRONTEND_URL}/`);
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
