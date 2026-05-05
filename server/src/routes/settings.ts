import { Router } from "express";
import * as settingController from "../controllers/settingController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", settingController.getSettings);
router.put("/", protect, settingController.updateSettings);

export default router;
