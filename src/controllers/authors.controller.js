import { 
  getAllAuthorsService, 
  getAuthorByIdService, 
  createAuthorService, 
  updateAuthorService, 
  deleteAuthorService 
} from "../services/authors.service.js";

export const getAuthors = async (req, res, next) => {
  try {
    const authors = await getAllAuthorsService();
    res.status(200).json(authors);
  } catch (error) { next(error); }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const author = await getAuthorByIdService(req.params.id);
    if (!author) return res.status(404).json({ error: "Autor no encontrado" });
    res.status(200).json(author);
  } catch (error) { next(error); }
};

export const createAuthor = async (req, res, next) => {
  try {
    const author = await createAuthorService(req.body);
    res.status(201).json(author);
  } catch (error) { next(error); }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const author = await updateAuthorService(req.params.id, req.body);
    if (!author) return res.status(404).json({ error: "Autor no encontrado" });
    res.status(200).json(author);
  } catch (error) { next(error); }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const ok = await deleteAuthorService(req.params.id);
    if (!ok) return res.status(404).json({ error: "Autor no encontrado" });
    res.status(204).send();
  } catch (error) { next(error); }
};