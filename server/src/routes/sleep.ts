import express from "express";
import { getSleepData } from "../controllers/sleepController";

const router = express.Router();

router.get("/", getSleepData);

export default router;
