# W02 Fix Summary

This project was reviewed against the W02 Assignment: Database Retrieval rubric. The original submission rendered some database-backed pages, but it was below the Sufficient level because the SQL schema/data and required model file/function names did not match the assignment.

## Rubric Rows Fixed

### 1. Database Design

The original `src/setup.sql` did not include all required W02 fields and seed data. It only inserted two organizations, three projects, no category rows, and no project/category relationship rows.

Changes made:
- Rebuilt `src/setup.sql` so it can recreate the W02 database from scratch.
- Added required organization fields:
  - `organization_id`
  - `name`
  - `description`
  - `contact_email`
  - `logo_filename`
- Added required project fields:
  - `project_id`
  - `organization_id`
  - `title`
  - `description`
  - `location`
  - `date`
- Added the categories table.
- Added the project/category many-to-many table with foreign keys and a composite primary key.
- Seeded:
  - 3 organizations
  - 6 projects
  - 4 categories
  - 6 project/category relationships

### 2. End-to-End Data Flow

The organizations page previously hardcoded logo choices by organization name, and project views used the old `name` field instead of the required `title`, `location`, and `date` fields.

Changes made:
- Updated organization views to render images from the database `logo_filename` value.
- Updated organization views to display database-backed contact emails.
- Updated project views to display `title`, `description`, `location`, and `date`.
- Updated category and detail views to use the revised project fields.
- Kept categories database-backed for W02 Complete-level data flow.

### 3. Code Organization and Standards

The original code used root-level model files with names like `organizationModel.js` and functions like `getOrganizations`. The rubric expects exact model file/function names from the learning activities.

Changes made:
- Added `src/models/organizations.js` with `getAllOrganizations`.
- Added `src/models/projects.js` with `getAllProjects`.
- Added `src/models/categories.js` with `getAllCategories`.
- Updated controllers and routes to use the new model files.
- Added direct GET routes in `server.js` for:
  - `/organizations`
  - `/projects`
  - `/categories`
- Kept existing detail routes for `/organization/:id`, `/project/:id`, and `/category/:id`.
- Preserved `src/models/db.js` as the shared database connection helper.

## Files Updated

- `server.js`
- `src/setup.sql`
- `src/models/organizations.js`
- `src/models/projects.js`
- `src/models/categories.js`
- `src/controllers/organizationController.js`
- `src/controllers/projectController.js`
- `src/controllers/categoryController.js`
- `src/views/organizations.ejs`
- `src/views/projects.ejs`
- `src/views/project-details.ejs`
- `src/views/organization-details.ejs`
- `src/views/category-details.ejs`

## Database Note

The database configured by `DB_URL` in `.env` was reseeded using the revised `src/setup.sql` so the app has the updated schema and data.

After reseeding, the database counts were verified as:
- 3 organizations
- 6 projects
- 4 categories
- 6 project/category relationships

## Verification

After reseeding, these routes were verified locally:
- `/organizations`
- `/projects`
- `/categories`
- `/organization/1`
- `/project/1`
- `/category/1`

Each page rendered dynamic database data without errors. JavaScript syntax checks also passed for `server.js` and all files under `src`.
