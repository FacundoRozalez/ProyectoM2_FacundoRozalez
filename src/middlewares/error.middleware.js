export const errorHandler = (err, req, res, next) => {
  console.error("❌ ERROR CODE:", err.code);
  console.error("❌ ERROR MESSAGE:", err.message);
  if (err.code === '23505' || err.message === "EMAIL_EXISTS") {
    return res.status(400).json({ 
      error: "El dato ya existe (ej: el email ya está registrado)" 
    });
  }
  if (err.code === '23503' || err.message === "AUTHOR_NOT_FOUND" || err.message === "POST_NOT_FOUND") {
    return res.status(400).json({ 
      error: "El recurso relacionado no existe (Autor o Post inexistente)" 
    });
  }
  const status = err.status || 500;
  res.status(status).json({ 
    error: status === 500 ? "Error interno del servidor" : err.message 
  });
};