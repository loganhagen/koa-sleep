import { Router } from "express";
import { sleepController } from "../controllers/sleepController";

const router = Router();

router.get("/", sleepController.getSleepData);
router.get("/efficiency", sleepController.getSleepEfficiency);
router.get("/stages", sleepController.getSleepStages);
router.get("/summary/:date", sleepController.getSessionSummary);
router.get("/deviation", sleepController.getDeviation);

export default router;
