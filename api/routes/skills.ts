import { Router } from "express";
import * as skillController from "../controllers/skillController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", skillController.getSkills);
router.post("/", protect, skillController.createSkill);
router.put("/:id", protect, skillController.updateSkill);
router.delete("/:id", protect, skillController.deleteSkill);

export default router;
