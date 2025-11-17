import { Router } from "express";
import { demoController } from "../controllers/demoController";

const router = Router();

/**
 * @swagger
 * /demo/login:
 *   get:
 *     summary: Returns a JWT cookie for a demo user.
 *     description: This endpoint authenticates the user as "demo@koa", sets a secure 'auth-token' HttpOnly cookie, and then redirects the client to the /home page.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Login successful. An HttpOnly cookie 'auth-token' is set.
 *       500:
 *         description: Internal server error
 */
router.get("/login", demoController.login);

/**
 * @swagger
 * /demo/logout:
 *   post:
 *     summary: Logs out the demo user by clearing the JWT cookie
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

export default router;
