import { Router } from "express";
import * as blogController from "../controllers/blogController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlog);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.post("/", protect, blogController.createBlog);
router.put("/:id", protect, blogController.updateBlog);
router.delete("/:id", protect, blogController.deleteBlog);

export default router;
