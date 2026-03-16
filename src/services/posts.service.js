import { pool } from "../config.js";

export const getAllPostsService = async () => {
  const { rows } = await pool.query(`
    SELECT posts.*, authors.name as author_name
    FROM posts
    JOIN authors ON posts.author_id = authors.id
    ORDER BY posts.id
  `);
  return rows;
};

export const getPostByIdService = async (id) => {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return rows[0];
};

export const getPostsByAuthorService = async (authorId) => {
  const { rows } = await pool.query(`
    SELECT posts.*, authors.name as author_name
    FROM posts
    JOIN authors ON posts.author_id = authors.id
    WHERE authors.id = $1
  `, [authorId]);
  return rows;
};

export const createPostService = async ({ title, content, author_id, published }) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, author_id, published ?? true]
  );
  return rows[0];
};

export const updatePostService = async (id, { title, content, author_id, published }) => {
  const { rows } = await pool.query(
    `UPDATE posts
     SET title=$1, content=$2, author_id=$3, published=$4
     WHERE id=$5
     RETURNING *`,
    [title, content, author_id, published, id]
  );
  return rows[0] || null;
};

export const deletePostService = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM posts WHERE id=$1", [id]);
  return rowCount > 0;
};