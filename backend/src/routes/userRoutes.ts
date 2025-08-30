import { Router } from "express";
import { userController } from "../controllers/userController";
import { sleepController } from "../controllers/sleepController";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/demo", userController.getDemoUser);
router.get("/:email", userController.getUserByEmail);
router.get("/:userId/sleep", sleepController.getSleepLogsByUserId);
router.get("/:userId/sleep/:date", sleepController.getSleepLogByDate);

export default router;
