import * as commentsService from "../services/comments.service.js";

export const getComments = async (req, res, next) => {
  try {
    const comments = await commentsService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    next(error); 
  }
};

export const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await commentsService.getCommentsByPost(postId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { content, post_id, author_id } = req.body;

    if (!content || !post_id || !author_id) {
      return res.status(400).json({ error: "Contenido, post_id y author_id son obligatorios" });
    }

    const comment = await commentsService.createComment({ content, post_id, author_id });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await commentsService.deleteComment(id);

    if (!deleted) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};