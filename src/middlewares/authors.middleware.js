export const validateAuthor = (req, res, next) => {
  const { name, email } = req.body;
  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: "El nombre y el email son campos obligatorios" });
  }
  next();
};