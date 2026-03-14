import { pool } from "../config.js";

export const getAllComments = async () => {
  const result = await pool.query(`
    SELECT comments.*, authors.name AS author_name
    FROM comments
    JOIN authors ON comments.author_id = authors.id
    ORDER BY comments.id
  `);
  return result.rows;
};

export const getCommentsByPost = async (postId) => {
  const result = await pool.query(`
    SELECT comments.*, authors.name AS author_name
    FROM comments
    JOIN authors ON comments.author_id = authors.id
    WHERE comments.post_id = $1
    ORDER BY comments.created_at
  `, [postId]);
  return result.rows;
};

export const createComment = async ({ post_id, author_id, content }) => {
  const postCheck = await pool.query("SELECT id FROM posts WHERE id = $1", [post_id]);
  if (postCheck.rows.length === 0) throw new Error("POST_NOT_FOUND");

  const authorCheck = await pool.query("SELECT id FROM authors WHERE id = $1", [author_id]);
  if (authorCheck.rows.length === 0) throw new Error("AUTHOR_NOT_FOUND");

  const result = await pool.query(
    `INSERT INTO comments (post_id, author_id, content)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [post_id, author_id, content]
  );

  return result.rows[0];
};

export const deleteComment = async (id) => {
  const result = await pool.query(
    "DELETE FROM comments WHERE id=$1 RETURNING id",
    [id]
  );

  if (result.rows.length === 0) return false;

  return true;
};