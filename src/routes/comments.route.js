import { Router } from "express";
import { 
  getComments, 
  getCommentsByPost, 
  createComment, 
  deleteComment 
} from "../controllers/comments.controller.js";

import { validateComment } from "../middlewares/comments.middleware.js";

const router = Router();
router.get("/", getComments);
router.get("/post/:postId", getCommentsByPost);
router.post("/", validateComment, createComment);
router.delete("/:id", deleteComment);

export default router;