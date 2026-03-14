import express from "express";
import * as postsController from "../controllers/posts.controller.js";

const router = express.Router();

router.get("/", postsController.getPosts);
router.get("/:id", postsController.getPostById);
router.get("/author/:authorId", postsController.getPostsByAuthor);
router.post("/", postsController.createPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

export default router;


