import { Router } from "express";
import { userController } from "../controllers/userController";
import { sleepController } from "../controllers/sleepController";
import { wellnessController } from "controllers/wellnessController";

const router = Router();

router.get("/:email", userController.getUserByEmail);

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
