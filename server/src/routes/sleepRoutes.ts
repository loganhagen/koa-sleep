import { Router } from "express";
import {
  getSleepEfficiency,
  getSleepData,
} from "../controllers/sleepController";

const router = Router();

/**
 * @swagger
 * /sleep:
 *  get:
 *    summary: Get the user's full sleep data from up to 7 previous nights.
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/", getSleepData);

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
