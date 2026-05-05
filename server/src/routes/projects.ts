import { Router } from "express";
import * as projectController from "../controllers/projectController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProject);
router.get("/slug/:slug", projectController.getProjectBySlug);
router.post("/", protect, projectController.createProject);
router.put("/:id", protect, projectController.updateProject);
router.delete("/:id", protect, projectController.deleteProject);

export default router;
