import { Router } from "express";
import { sleepController } from "../controllers/sleepController";

const router = Router();

router.get("/all", sleepController.getSleepLogs);
router.get("/find", sleepController.getSleepLogByUser);

export default router;
