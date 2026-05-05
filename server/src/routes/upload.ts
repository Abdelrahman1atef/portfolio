import { Router } from "express";
import * as uploadController from "../controllers/uploadController";
import { protect } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/", protect, upload.single("file"), uploadController.uploadFile);

export default router;
