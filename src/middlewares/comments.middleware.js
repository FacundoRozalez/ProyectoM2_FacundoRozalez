export const validateComment = (req, res, next) => {
  const { post_id, author_id, content } = req.body;
  if (!post_id || !author_id || !content?.trim()) {
    return res.status(400).json({ error: "Contenido, post_id y author_id son obligatorios" });
  }
  next();
};