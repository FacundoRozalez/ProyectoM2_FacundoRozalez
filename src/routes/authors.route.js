import express from "express";
import * as authorsController from "../controllers/authors.controller.js";

const router = express.Router();

router.get("/", authorsController.getAuthors);
router.get("/:id", authorsController.getAuthorById);
router.post("/", authorsController.createAuthor);
router.put("/:id", authorsController.updateAuthor);
router.delete("/:id", authorsController.deleteAuthor);

export default router;