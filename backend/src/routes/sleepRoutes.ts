import { Router } from "express";
import { sleepController } from "../controllers/sleepController";

const router = Router();

router.get("/", sleepController.getSleepLogs);

export default router;