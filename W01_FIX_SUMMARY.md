# W01 Fix Summary

This project was reviewed against the W01 Assignment: Initial Site Creation rubric. The site was mostly working, but a few rubric rows needed cleanup before it could be marked complete.

## Rubric Rows Fixed

### 1. EJS Pages

The organizations page only displayed two organizations. The rubric notes require images and text for at least three organizations.

Changes made:
- Added a third organization, Goodwill, to `src/setup.sql`.
- Added a related service project for Goodwill.
- Added category seed data so the categories page has the required content after a database reset.
- Updated `src/views/organizations.ejs` so the Goodwill image can render with the other organization cards.

### 2. EJS Partials

The organizations view contained the entire page markup twice. Because the header and footer partials were duplicated in the same file, the deployed page rendered duplicate HTML.

Changes made:
- Removed the duplicate markup from `src/views/organizations.ejs`.
- Kept one header partial include at the top and one footer partial include at the bottom.
- Moved `<main>` ownership into each view so pages do not render nested main elements.

### 4. Code Organization and Standards

The rubric asks for functions to use arrow notation.

Changes made:
- Converted controller functions to arrow functions.
- Converted model functions to arrow functions.

## Files Updated

- `src/setup.sql`
- `src/views/organizations.ejs`
- `src/views/index.ejs`
- `src/views/partials/header.ejs`
- `src/views/partials/footer.ejs`
- `src/controllers/organizationController.js`
- `src/controllers/projectController.js`
- `src/controllers/categoryController.js`
- `src/models/organizationModel.js`
- `src/models/projectModel.js`
- `src/models/categoryModel.js`
- `src/models/db.js`
- `server.js`

## Database Note

The database configured in `.env` was reseeded using the revised `src/setup.sql`. After seeding, the database contained:
- 3 organizations
- 4 projects
- 4 categories
- 4 project/category relationships

If this project is deployed to a different Render database later, that database should also be seeded with the revised `src/setup.sql`.

The code now expects Goodwill to exist as a third organization and uses `public/images/goodwill.png` for its image.

`src/models/db.js` was also replaced with the course database helper pattern, which uses `DB_URL` from `.env`.

The project structure was updated so `controllers`, `models`, `routes`, and `views` are all under `src`. The `public` directory remains at the project root for static files.
