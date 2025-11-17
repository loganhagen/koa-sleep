import { Router } from "express";
import { demoController } from "../controllers/authController";

const router = Router();

/**
 * @swagger
 * /demo/login:
 *   post:
 *     summary: Authenticates a demo user and returns a JWT cookie
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
router.post("/demo/login", demoController.login);

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
router.post("/demo/logout", (_, res) => {
  res.clearCookie("auth-token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

export default router;
