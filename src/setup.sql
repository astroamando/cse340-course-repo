DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;

CREATE TABLE organizations (
  organization_id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  logo_filename VARCHAR(255) NOT NULL
);

CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  organization_id INTEGER NOT NULL
    REFERENCES organizations(organization_id),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(200) NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
  project_id INTEGER NOT NULL
    REFERENCES projects(project_id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL
    REFERENCES categories(category_id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, category_id)
);

INSERT INTO organizations (
  name,
  description,
  contact_email,
  logo_filename
)
VALUES
(
  'Red Cross',
  'Humanitarian organization supporting emergency response and community health.',
  'volunteer@redcross.org',
  'redcross.png'
),
(
  'Habitat for Humanity',
  'Builds affordable homes and supports families through housing projects.',
  'serve@habitat.org',
  'humanity.png'
),
(
  'Goodwill',
  'Provides job training and community support services.',
  'community@goodwill.org',
  'goodwill.png'
),
(
  'Utah Community Volunteers',
  'Provides volunteer services and community support.',
  'volunteer@example.com',
  'utah-community-volunteers.png'
);

INSERT INTO projects (
  organization_id,
  title,
  description,
  location,
  date
)
VALUES
(
  1,
  'Blood Drive',
  'Community blood donation event.',
  'Rexburg Community Center',
  '2026-08-12'
),
(
  1,
  'Disaster Relief Kits',
  'Assemble emergency supply kits for families affected by disasters.',
  'Red Cross Warehouse',
  '2026-08-26'
),
(
  2,
  'House Construction',
  'Build homes for families in need of affordable housing.',
  'Madison County Build Site',
  '2026-09-05'
),
(
  2,
  'Neighborhood Repair Day',
  'Help repair porches, fences, and accessibility ramps.',
  'Downtown Rexburg',
  '2026-09-19'
),
(
  3,
  'Career Workshop',
  'Help community members build resumes and practice interviews.',
  'Goodwill Training Center',
  '2026-10-03'
),
(
  3,
  'Donation Sorting Day',
  'Sort donated clothing and household items for local families.',
  'Goodwill Donation Center',
  '2026-10-17'
);

INSERT INTO categories (name)
VALUES
  ('Health'),
  ('Housing'),
  ('Job Training'),
  ('Disaster Relief');

INSERT INTO project_categories (
  project_id,
  category_id
)
VALUES
  (1, 1),
  (2, 4),
  (3, 2),
  (4, 2),
  (5, 3),
  (6, 3);