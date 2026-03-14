import { pool } from "../config.js";

export const getAllAuthors = async () => {
  const result = await pool.query(
    "SELECT * FROM authors ORDER BY id"
  );

  return result.rows;
};

export const getAuthorById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

export const createAuthor = async ({ name, email, bio }) => {

  // validar email único
  const emailCheck = await pool.query(
    "SELECT id FROM authors WHERE email = $1",
    [email]
  );

  if (emailCheck.rows.length > 0) {
    throw new Error("EMAIL_EXISTS");
  }

  const result = await pool.query(
    `INSERT INTO authors (name, email, bio)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [name, email, bio]
  );

  return result.rows[0];
};

export const updateAuthor = async (id, { name, email, bio }) => {

  const existing = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [id]
  );

  if (existing.rows.length === 0) {
    return null;
  }

  const emailCheck = await pool.query(
    "SELECT id FROM authors WHERE email = $1 AND id != $2",
    [email, id]
  );

  if (emailCheck.rows.length > 0) {
    throw new Error("EMAIL_EXISTS");
  }

  const result = await pool.query(
    `UPDATE authors
     SET name = $1,
         email = $2,
         bio = $3
     WHERE id = $4
     RETURNING *`,
    [name, email, bio, id]
  );

  return result.rows[0];
};

export const deleteAuthor = async (id) => {

  const result = await pool.query(
    "DELETE FROM authors WHERE id = $1 RETURNING id",
    [id]
  );

  if (result.rows.length === 0) {
    return false;
  }

  return true;
};