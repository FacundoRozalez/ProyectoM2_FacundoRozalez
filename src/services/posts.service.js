import { pool } from "../config.js";

export const getAllPosts = async () => {

  const result = await pool.query(`
    SELECT posts.*, authors.name as author_name
    FROM posts
    JOIN authors ON posts.author_id = authors.id
    ORDER BY posts.id
  `);

  return result.rows;
};

export const getPostById = async (id) => {

  const result = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

export const getPostsByAuthor = async (authorId) => {

  const result = await pool.query(`
    SELECT posts.*, authors.name as author_name
    FROM posts
    JOIN authors ON posts.author_id = authors.id
    WHERE authors.id = $1
  `, [authorId]);

  return result.rows;
};

export const createPost = async ({ title, content, author_id, published }) => {

  const authorCheck = await pool.query(
    "SELECT id FROM authors WHERE id = $1",
    [author_id]
  );

  if (authorCheck.rows.length === 0) {
    throw new Error("AUTHOR_NOT_FOUND");
  }

  const result = await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [title, content, author_id, published ?? true]
  );

  return result.rows[0];
};

export const updatePost = async (id, { title, content, author_id, published }) => {

  const postCheck = await pool.query(
    "SELECT id FROM posts WHERE id = $1",
    [id]
  );

  if (postCheck.rows.length === 0) {
    return null;
  }

  const authorCheck = await pool.query(
    "SELECT id FROM authors WHERE id = $1",
    [author_id]
  );

  if (authorCheck.rows.length === 0) {
    throw new Error("AUTHOR_NOT_FOUND");
  }

  const result = await pool.query(
    `UPDATE posts
     SET title=$1,
         content=$2,
         author_id=$3,
         published=$4
     WHERE id=$5
     RETURNING *`,
    [title, content, author_id, published, id]
  );

  return result.rows[0];
};

export const deletePost = async (id) => {

  const result = await pool.query(
    "DELETE FROM posts WHERE id=$1 RETURNING id",
    [id]
  );

  if (result.rows.length === 0) {
    return false;
  }

  return true;
};