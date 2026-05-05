import { Router } from "express";
import * as aboutController from "../controllers/aboutController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", aboutController.getAbout);
router.put("/", protect, aboutController.updateAbout);

export default router;
