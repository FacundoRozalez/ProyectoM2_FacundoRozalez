import express from "express";
import * as commentsController from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/", commentsController.getComments);
router.get("/post/:postId", commentsController.getCommentsByPost);
router.post("/", commentsController.createComment);
router.delete("/:id", commentsController.deleteComment);

export default router;