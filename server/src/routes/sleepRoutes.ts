import { Router } from "express";
import {
  getSleepEfficiency,
  getSleepData,
  getSleepStages,
  getSessionSummary,
} from "../controllers/sleepController";

const router = Router();

router.get("/", getSleepData);
router.get("/efficiency", getSleepEfficiency);
router.get("/stages", getSleepStages);
router.get("/summary/:date", getSessionSummary);

export default router;
