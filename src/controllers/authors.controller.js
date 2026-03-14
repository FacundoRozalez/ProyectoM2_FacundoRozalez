import * as authorsService from "../services/authors.service.js";

export const getAuthors = async (req, res, next) => {
  try {
    const authors = await authorsService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await authorsService.getAuthorById(id);

    if (!author) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

export const createAuthor = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre no puede estar vacío" });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({ error: "El correo electrónico es obligatorio" });
    }

    const author = await authorsService.createAuthor({ name, email, bio });
    res.status(201).json(author);

  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(400).json({ error: "El correo electrónico ya existe" });
    }
    next(error);
  }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre no puede estar vacío" });
    }

    if (!email || email.trim() === "") {
      return res.status(400).json({ error: "El correo electrónico es obligatorio" });
    }

    const author = await authorsService.updateAuthor(id, { name, email, bio });

    if (!author) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.status(200).json(author);
  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(400).json({ error: "El correo electrónico ya existe" });
    }
    next(error);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await authorsService.deleteAuthor(id);

    if (!deleted) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};