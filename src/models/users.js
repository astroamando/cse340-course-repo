import db from "./db.js";

const createUser = async (
  firstName,
  lastName,
  email,
  hashedPassword,
  role = "user"
) => {
  const sql = `
    INSERT INTO users (
      first_name,
      last_name,
      email,
      password,
      role
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      user_id,
      first_name,
      last_name,
      email,
      role;
  `;

  const values = [
    firstName,
    lastName,
    email,
    hashedPassword,
    role,
  ];

  const result = await db.query(sql, values);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const sql = `
    SELECT
      user_id,
      first_name,
      last_name,
      email,
      password,
      role
    FROM users
    WHERE email = $1;
  `;

  const result = await db.query(sql, [email]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const sql = `
    SELECT
      user_id,
      first_name,
      last_name,
      email,
      role
    FROM users
    ORDER BY last_name, first_name;
  `;

  const result = await db.query(sql);
  return result.rows;
};

export {
  createUser,
  getUserByEmail,
  getAllUsers,
};