import { 
  getAllPostsService, 
  getPostByIdService, 
  getPostsByAuthorService, 
  createPostService, 
  updatePostService, 
  deletePostService 
} from "../services/posts.service.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPostsService();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await getPostByIdService(req.params.id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPostsByAuthor = async (req, res, next) => {
  try {
    const posts = await getPostsByAuthorService(req.params.authorId);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const post = await createPostService(req.body);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await updatePostService(req.params.id, req.body);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const deleted = await deletePostService(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post no encontrado" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};