import * as postsService from "../services/posts.service.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await postsService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postsService.getPostById(id);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPostsByAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const posts = await postsService.getPostsByAuthor(authorId);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, author_id, published } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "El título es obligatorio" });
    }
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "El contenido es obligatorio" });
    }
    if (!author_id) {
      return res.status(400).json({ error: "El author_id es obligatorio" });
    }
    const post = await postsService.createPost({
      title, content, author_id, published
    });
    res.status(201).json(post);
  } catch (error) {
    if (error.message === "AUTHOR_NOT_FOUND") {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { title, content, author_id, published } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({
        error: "El título, contenido y author_id son obligatorios"
      });
    }

    const post = await postsService.updatePost(id, {
      title, content, author_id, published
    });
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(200).json(post);
  } catch (error) {
    if (error.message === "AUTHOR_NOT_FOUND") {
      return res.status(404).json({ error: "Autor no encontrado" });
    }
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await postsService.deletePost(id);

    if (!deleted) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};