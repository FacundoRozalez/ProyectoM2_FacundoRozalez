import { Router } from "express";
import { 
  getAuthors, 
  getAuthorById, 
  createAuthor, 
  updateAuthor, 
  deleteAuthor 
} from "../controllers/authors.controller.js";
import { validateAuthor } from "../middlewares/authors.middleware.js";

const router = Router();
router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.post("/", validateAuthor, createAuthor);
router.put("/:id", validateAuthor, updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;