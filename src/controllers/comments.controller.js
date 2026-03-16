import { 
  getAllCommentsService, 
  getCommentsByPostService, 
  createCommentService, 
  deleteCommentService 
} from "../services/comments.service.js";

export const getComments = async (req, res, next) => {
  try {
    const comments = await getAllCommentsService();
    res.status(200).json(comments);
  } catch (error) {
    next(error); 
  }
};

export const getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await getCommentsByPostService(req.params.postId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const comment = await createCommentService(req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const deleted = await deleteCommentService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};