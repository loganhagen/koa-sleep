import { Router } from "express";
import { authController } from "@controllers/authController";

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
          href="/api/auth/fitbit/callback?error=access_denied&error_description=User+denied+access"
          style="padding: 10px 15px; margin: 10px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Deny
        </a>
      </body>
    </html>
  `);
});

router.get("/fitbit/callback", authController.handleFitbitCallback);
// Mock for /oauth2/token
router.post("/fitbit/token", authController.getTokens);
// Mock for /1/user/[user-id]/profile.json
router.get("/fitbit/user", authController.getProfile);

export default router;
