import { Router } from "express";
import {
  getSleepEfficiency,
  getAverageSleep,
  getSleepData,
} from "../controllers/sleepController";

const router = Router();
router.get("/", getSleepData);

/**
 * @swagger
 * /sleep/average:
 *  get:
 *    summary: Get average sleep
 *    description: Get average sleep!
 *    responses:
 *      200:
 *        description: A sample res
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/average", getAverageSleep);

/**
 * @swagger
 * /sleep/efficiency:
 *  get:
 *    summary: Get the efficiency score of up to the last 7 sleep records.
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/efficiency", getSleepEfficiency);

export default router;
