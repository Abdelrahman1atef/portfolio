import { Router } from "express";
import * as messageController from "../controllers/messageController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", protect, messageController.getMessages);
router.post("/", messageController.createMessage); // Public endpoint for contact form
router.patch("/:id/read", protect, messageController.markAsRead);
router.delete("/:id", protect, messageController.deleteMessage);

export default router;
