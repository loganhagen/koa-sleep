import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userService } from "@services/userService";
import { fitbitService } from "@services/fitbitService";
import { decrypt, encrypt } from "@utils/encryption";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 3600000,
  path: "/",
};

export const authController = {
  handleFitbitAuthRedirect: async (_: Request, res: Response) => {
    try {
      const { url, state, verifier } = fitbitService.getAuthorizationUrl();

      res.cookie("oauth_state", encrypt(state), COOKIE_OPTIONS);
      res.cookie("code_verifier", encrypt(verifier), COOKIE_OPTIONS);
      res.redirect(url);
    } catch (err) {
      console.error("Error generating auth URL:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  handleFitbitCallback: async (req: Request, res: Response) => {
    const { code, error, state } = req.query;

    if (error) {
      console.log("User denied Fitbit access.");
      return res.redirect(`${process.env.FRONTEND_URL}/`);
    }

    if (
      !code ||
      typeof code !== "string" ||
      !state ||
      typeof state !== "string"
    ) {
      return res.status(400).send("Missing authorization code or state");
    }

    const stateCookie = req.cookies["oauth_state"];
    const verifierCookie = req.cookies["code_verifier"];

    if (!stateCookie || !verifierCookie) {
      return res
        .status(400)
        .send("Session expired or invalid cookies. Please try again.");
    }

    try {
      const decryptedState = decrypt(stateCookie);
      const codeVerifier = decrypt(verifierCookie);

      if (state !== decryptedState) {
        console.error("State mismatch. Possible CSRF attack.");
        return res.status(403).send("State mismatch. Request denied.");
      }

      const tokens = await fitbitService.exchangeCodeForTokens(
        code,
        codeVerifier
      );

      const user = await userService.findOrCreateFromFitbit(tokens);

      const webToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      res.clearCookie("oauth_state", COOKIE_OPTIONS);
      res.clearCookie("code_verifier", COOKIE_OPTIONS);

      res.cookie("auth-token", webToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000,
        path: "/",
      });

      res.redirect(`${process.env.FRONTEND_URL}/home`);
    } catch (error) {
      console.error(
        "Error in Fitbit callback:",
        error instanceof Error ? error.message : "Unknown error"
      );
      res.redirect(`${process.env.FRONTEND_URL}/`);
    }
  },
};
