import { Router } from "express";
import {
  getSleepEfficiency,
  getSleepData,
  getSleepStages,
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

/**
 * @swagger
 * /sleep/stages:
 *  get:
 *    summary: Get the time spent in different sleep stages in the previous night's sleep.
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/stages", getSleepStages);

export default router;
