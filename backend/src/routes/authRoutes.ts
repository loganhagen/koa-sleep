import { Router } from "express";
import { authController } from "../controllers/authController";
import { userService } from "@services/userService";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticates a user and returns a JWT cookie
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "demo@koa"
 *     responses:
 *       200:
 *         description: Login successful. An HttpOnly cookie 'auth-token' is set.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userId:
 *                   type: string
 *                   format: uuid
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logs out the user by clearing the JWT cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful. The 'auth-token' cookie is cleared.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 */
router.post("/logout", (_, res) => {
  res.clearCookie("auth-token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

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
