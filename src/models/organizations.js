import db from "./db.js";

const getAllOrganizations = async () => {
  const sql = `
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM organizations
    ORDER BY organization_id;
  `;

  const result = await db.query(sql);
  return result.rows;
};

const getOrganizationDetails = async (id) => {
  const sql = `
    SELECT organization_id, name, description, contact_email, logo_filename
    FROM organizations
    WHERE organization_id = $1;
  `;

  const result = await db.query(sql, [id]);
  return result.rows[0];
};

const getProjectsByOrganization = async (id) => {
  const sql = `
    SELECT project_id, title, description, location, date::text AS date
    FROM projects
    WHERE organization_id = $1
      AND date >= CURRENT_DATE
    ORDER BY date;
  `;

  const result = await db.query(sql, [id]);
  return result.rows;
};

const createOrganization = async (
  name,
  description,
  contactEmail,
  logoFilename
) => {
  const sql = `
    INSERT INTO organizations
      (name, description, contact_email, logo_filename)
    VALUES ($1, $2, $3, $4)
    RETURNING
      organization_id,
      name,
      description,
      contact_email,
      logo_filename;
  `;

  const result = await db.query(sql, [
    name,
    description,
    contactEmail,
    logoFilename,
  ]);

  return result.rows[0];
};

const updateOrganization = async (
  id,
  name,
  description,
  contactEmail,
  logoFilename
) => {
  const sql = `
    UPDATE organizations
    SET
      name = $1,
      description = $2,
      contact_email = $3,
      logo_filename = $4
    WHERE organization_id = $5
    RETURNING
      organization_id,
      name,
      description,
      contact_email,
      logo_filename;
  `;

  const result = await db.query(sql, [
    name,
    description,
    contactEmail,
    logoFilename,
    id,
  ]);

  return result.rows[0];
};

export {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganization,
  createOrganization,
  updateOrganization,
};