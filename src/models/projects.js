import db from "./db.js";

const getAllProjects = async () => {
  const sql = `
    SELECT
      p.project_id,
      p.organization_id,
      p.title,
      p.description,
      p.location,
      p.date::text AS date,
      o.name AS organization_name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date;
  `;

  const result = await db.query(sql);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const sql = `
    SELECT
      p.project_id,
      p.organization_id,
      p.title,
      p.description,
      p.location,
      p.date::text AS date,
      o.name AS organization_name
    FROM projects p
    JOIN organizations o
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const result = await db.query(sql, [id]);
  return result.rows[0];
};

const getCategoriesByProject = async (id) => {
  const sql = `
    SELECT
      c.category_id,
      c.name
    FROM categories c
    JOIN project_categories pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;

  const result = await db.query(sql, [id]);
  return result.rows;
};

const updateProjectCategories = async (projectId, categoryIds) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `DELETE FROM project_categories
       WHERE project_id = $1;`,
      [projectId]
    );

    for (const categoryId of categoryIds) {
      await client.query(
        `INSERT INTO project_categories (project_id, category_id)
         VALUES ($1, $2);`,
        [projectId, categoryId]
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getCategoriesByProjectId = getCategoriesByProject;

export {
  getAllProjects,
  getProjectDetails,
  getCategoriesByProject,
  getCategoriesByProjectId,
  updateProjectCategories,
};