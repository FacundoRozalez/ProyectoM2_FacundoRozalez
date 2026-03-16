import { Router } from "express";
import { 
  getPosts, 
  getPostById, 
  getPostsByAuthor, 
  createPost, 
  updatePost, 
  deletePost 
} from "../controllers/posts.controller.js";

import { validatePost } from "../middlewares/posts.middleware.js";

const router = Router();
router.get("/", getPosts);
router.get("/:id", getPostById);
router.get("/author/:authorId", getPostsByAuthor);
router.post("/", validatePost, createPost);
router.put("/:id", validatePost, updatePost);
router.delete("/:id", deletePost);

export default router;