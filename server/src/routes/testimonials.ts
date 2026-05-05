import { Router } from "express";
import * as testimonialController from "../controllers/testimonialController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", testimonialController.getTestimonials);
router.post("/", protect, testimonialController.createTestimonial);
router.put("/:id", protect, testimonialController.updateTestimonial);
router.delete("/:id", protect, testimonialController.deleteTestimonial);

export default router;
