import { Router } from "express";
import { sleepController } from "../controllers/sleepController";

const router = Router();

router.get("/all", sleepController.getSleepLogs);
router.get("/get", sleepController.getSleepLogsByUserId);

export default router;
