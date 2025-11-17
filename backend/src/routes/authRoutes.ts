import { Router } from "express";
import { userService } from "@services/userService";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/fitbit/login", (_, res) => {
  res.redirect("/api/auth/fitbit/mock-consent");
});

router.get("/fitbit/mock-consent", (_, res) => {
  const fakeCode = "MOCK_CODE_12345";

  res.send(`
    <html>
      <body style="font-family: sans-serif; padding: 20px;">
        <h2>Mock Fitbit Login</h2>
        <p>Do you allow <strong>Koa Sleep</strong> to access your sleep data?</p>
        <a 
          href="/api/auth/fitbit/callback?code=${fakeCode}"
          style="padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;"
        >
          Allow
        </a>
        <a 
          href="/"
          style="padding: 10px 15px; margin: 10px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Go Back
        </a>
      </body>
    </html>
  `);
});

router.get("/fitbit/callback", async (req, res) => {
  const code = req.query.code as string;

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
});

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

export default router;
