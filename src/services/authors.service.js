import { pool } from "../config.js";

export const getAllAuthorsService = async () => {
  const { rows } = await pool.query("SELECT * FROM authors ORDER BY id");
  return rows;
};

export const getAuthorByIdService = async (id) => {
  const { rows } = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);
  return rows[0]; 
};

export const createAuthorService = async ({ name, email, bio }) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bio]
    );
    return rows[0];
  } catch (error) {
    if (error.code === '23505') throw new Error("EMAIL_EXISTS");
    throw error;
  }
};

export const updateAuthorService = async (id, { name, email, bio }) => {
  try {
    if (email) {
      const { rows } = await pool.query("SELECT id FROM authors WHERE email = $1 AND id != $2", [email, id]);
      if (rows.length > 0) {
        throw new Error("EMAIL_EXISTS");
      }
    }
    const { rows } = await pool.query(
      "UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *",
      [name, email, bio, id]
    );
    return rows[0] || null;
  } catch (error) {
    if (error.code === '23505') throw new Error("EMAIL_EXISTS");
    throw error;
  }
};

export const deleteAuthorService = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM authors WHERE id = $1", [id]);
  return rowCount > 0;
};