import db from "./db.js";

const getAllCategories = async () => {
  const result = await db.query(`SELECT category_id, name FROM categories ORDER BY name;`);
  return result.rows;
};

const getCategoryDetails = async (id) => {
  const result = await db.query(`SELECT category_id, name FROM categories WHERE category_id = $1;`, [id]);
  return result.rows[0];
};

const getProjectsByCategory = async (id) => {
  const result = await db.query(`
    SELECT p.project_id, p.title, p.description, p.location, p.date::text AS date
    FROM projects p
    JOIN project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date;`, [id]);
  return result.rows;
};

const createCategory = async (name) => {
  const result = await db.query(
    `INSERT INTO categories (name) VALUES ($1) RETURNING category_id, name;`,
    [name]
  );
  return result.rows[0];
};

const updateCategory = async (id, name) => {
  const result = await db.query(
    `UPDATE categories SET name = $1 WHERE category_id = $2 RETURNING category_id, name;`,
    [name, id]
  );
  return result.rows[0];
};

const getProjectsByCategoryId = getProjectsByCategory;

export { getAllCategories, getCategoryDetails, getProjectsByCategory, getProjectsByCategoryId, createCategory, updateCategory };
