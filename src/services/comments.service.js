import { pool } from "../config.js";

export const getAllCommentsService = async () => {
  const { rows } = await pool.query(`
    SELECT comments.*, authors.name AS author_name
    FROM comments
    JOIN authors ON comments.author_id = authors.id
    ORDER BY comments.id
  `);
  return rows;
};

export const getCommentsByPostService = async (postId) => {
  const { rows } = await pool.query(`
    SELECT comments.*, authors.name AS author_name
    FROM comments
    JOIN authors ON comments.author_id = authors.id
    WHERE comments.post_id = $1
    ORDER BY comments.created_at
  `, [postId]);
  return rows;
};

export const createCommentService = async ({ post_id, author_id, content }) => {
  const { rows } = await pool.query(
    `INSERT INTO comments (post_id, author_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [post_id, author_id, content]
  );
  return rows[0];
};

export const deleteCommentService = async (id) => {
  const { rowCount } = await pool.query(
    "DELETE FROM comments WHERE id = $1",
    [id]
  );
  return rowCount > 0;
};