import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

router.get("/all", userController.getAllUsers);
router.get("/demo", userController.getDemoUser);

export default router;
