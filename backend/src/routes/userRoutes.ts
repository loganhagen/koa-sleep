import { Router } from "express";
import { userController } from "@controllers/userController";
import { sleepController } from "@controllers/sleepController";
import { wellnessController } from "@controllers/wellnessController";
import {
  authenticateToken,
  verifyUserAccess,
} from "../middleware/authMiddleware";

const router = Router();

router.use(authenticateToken);

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get the currently logged in user.
 *     tags: [User]
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
router.get("/me", userController.getCurrentUser);

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
router.get(
  "/:userId/sleep",
  verifyUserAccess,
  sleepController.getSleepLogsByUserId
);

/**
 * @swagger
 * /user/{userId}/sleep/recent:
 *   get:
 *     summary: Get the most recent sleep log for a user
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
 *         description: The most recent sleep log
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/SleepLog'
 *       400:
 *         description: Invalid user ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No sleep logs found for the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/:userId/sleep/recent",
  verifyUserAccess,
  sleepController.getMostRecentSleepLog
);

/**
 * @swagger
 * /user/{userId}/sleep/{date}:
 *   get:
 *     summary: Get sleep log by date for a user
 *     tags: [Sleep]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The date of the sleep log (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: The sleep log for the specified date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/SleepLog'
 *       400:
 *         description: Invalid user ID or date supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Sleep log not found for the given date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/:userId/sleep/:date",
  verifyUserAccess,
  sleepController.getSleepLogByDate
);

/**
 * @swagger
 * /user/{userId}/wellness-summary/{date}:
 *   get:
 *     summary: Get wellness summary by date for a user
 *     tags: [Wellness]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The date for the wellness summary (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: The wellness summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/WellnessSummary'
 *       400:
 *         description: Invalid user ID or date supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Wellness summary not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/:userId/wellness-summary/:date",
  verifyUserAccess,
  wellnessController.getWellnessSummaryByDate
);

/**
 * @swagger
 * /user/{userId}/sleep-stages/{date}:
 *   get:
 *     summary: Get sleep stages by date for a user
 *     tags: [Sleep]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The date of the sleep stages (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: The sleep stages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/SleepStages'
 *       400:
 *         description: Invalid user ID or date supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Sleep stages not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/:userId/sleep-stages/:date",
  verifyUserAccess,
  sleepController.getSleepStagesByDate
);

/**
 * @swagger
 * /user/{userId}/core-metrics/{date}:
 *   get:
 *     summary: Get core sleep metrics by date for a user
 *     tags: [Sleep]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The date for the core metrics (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: The core sleep metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/CoreMetrics'
 *       400:
 *         description: Invalid user ID or date supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Core metrics not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/:userId/core-metrics/:date",
  verifyUserAccess,
  sleepController.getSleepSummaryByDate
);

/**
 * @swagger
 * /user/{userId}/full-logs:
 *   get:
 *     summary: Get all logs for a user
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
 *         description: All logs for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/FullLogs'
 *       400:
 *         description: Invalid user ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:userId/full-logs", verifyUserAccess, sleepController.getFullLogs);
/**
 * @swagger
 * /user/{userId}/sleep/smart-summary/{date}:
 *   get:
 *     summary: Get smart summary by date for a user
 *     tags: [Sleep]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The date for the smart summary (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: The smart summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/SmartSummary'
 *       400:
 *         description: Invalid user ID or date supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Smart summary not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  "/:userId/sleep/smart-summary/:date",
  verifyUserAccess,
  sleepController.getSmartSummaryByDate
);

export default router;
