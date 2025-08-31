import { Router } from "express";
import { userController } from "../controllers/userController";
import { sleepController } from "../controllers/sleepController";
import { wellnessController } from "controllers/wellnessController";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/demo", userController.getDemoUser);
router.get("/:email", userController.getUserByEmail);
router.get("/:userId/sleep", sleepController.getSleepLogsByUserId);
router.get("/:userId/sleep/recent", sleepController.getMostRecentSleepLog);
router.get("/:userId/sleep/:date", sleepController.getSleepLogByDate);
router.get("/:userId/temperature", wellnessController.getSkinTempLogs);
router.get(
  "/:userId/temperature/:date",
  wellnessController.getSkinTempLogByDate
);
router.get(
  "/:userId/breathing-rate/:date",
  wellnessController.getBreathingRateByDate
);

export default router;
