import { Router } from "express";
import { authController } from "@controllers/authController";

const router = Router();

router.get("/fitbit/login", authController.handleFitbitAuthRedirect);
router.get("/fitbit/callback", authController.handleFitbitCallback);

export default router;
