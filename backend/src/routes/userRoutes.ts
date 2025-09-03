import { Router } from "express";
import { userController } from "../controllers/userController";
import { sleepController } from "../controllers/sleepController";
import { wellnessController } from "controllers/wellnessController";

const router = Router();

/**
 * @swagger
 * /user/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's email
 *     responses:
 *       200:
 *         description: The user's data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *        description: Invalid email supplied
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:email", userController.getUserByEmail);

/**
 * @swagger
 * /user/{userId}/sleep:
 *   get:
 *     summary: Get all sleep logs for a user
 *     tags: [Sleep]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of sleep logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SleepLog'
 *       400:
 *        description: Invalid user ID supplied
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:userId/sleep", sleepController.getSleepLogsByUserId);

router.get("/:userId/sleep/recent", sleepController.getMostRecentSleepLog);
router.get("/:userId/sleep/:date", sleepController.getSleepLogByDate);
router.get(
  "/:userId/wellness-summary/:date",
  wellnessController.getWellnessSummaryByDate
);
router.get("/:userId/sleep-stages/:date", sleepController.getSleepStagesByDate);
router.get("/:userId/core-metrics/:date", sleepController.getCoreMetricsByDate);

export default router;
