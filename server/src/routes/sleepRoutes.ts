import { Router } from "express";
import { getSleepData } from "../controllers/sleepController";

const router = Router();
router.get("/", getSleepData);

export default router;
