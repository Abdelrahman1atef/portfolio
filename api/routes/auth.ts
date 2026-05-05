import { Router } from "express";
import * as authController from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/login", authController.login);
router.get("/me", protect, authController.getMe);

export default router;
