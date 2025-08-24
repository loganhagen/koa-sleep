import { Router } from "express";
import { sleepController } from "../controllers/sleepController";

const router = Router();

router.get("/logs", sleepController.getSleepLogs);
router.get("/recent", sleepController.getMostRecentSleepLog);

export default router;
