import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

router.get("/all", userController.getAllUsers);
router.get("/get", userController.getUserByEmail);
router.get("/get/demo", userController.getDemoUser);

export default router;
