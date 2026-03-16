export const validatePost = (req, res, next) => {
  const { title, content, author_id } = req.body;
  if (!title || String(title).trim() === "") {
    return res.status(400).json({ error: "El título es obligatorio" });
  }
  if (!content || String(content).trim() === "") {
    return res.status(400).json({ error: "El contenido del post no puede estar vacío" });
  }
  if (!author_id) {
    return res.status(400).json({ error: "Se requiere un ID de autor válido" });
  }
  next();
};