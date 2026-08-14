# W03 Fix Summary

This project was reviewed against the W03 Assignment: Model-View-Controller Implementation rubric. The local code already had working database-backed list and detail pages after the W02 fixes, but it still needed clearer MVC organization and W03 naming conventions.

## Rubric Rows Fixed

### 1. List Pages

The list pages were already rendering database-backed data, but W03 expects the projects list to represent upcoming projects.

Changes made:
- Kept `/organizations`, `/projects`, and `/categories` as list pages.
- Ensured each organization links to `/organization/:id`.
- Ensured each project links to `/project/:id`.
- Ensured each category links to `/category/:id`.
- Updated the projects query to only list projects with `date >= CURRENT_DATE`.

### 2. Details Pages

The W03 detail pages need entity details plus related links.

Changes confirmed:
- `/organization/:id` displays the organization name, description, image, contact email, and links to that organization's projects.
- `/project/:id` displays the project title, description, location, date, organization link, and category links.
- `/category/:id` displays the category name and links to projects in that category.

### 3. Code Organization and Standards

The earlier structure still had list route handlers directly in `server.js`. W03 expects the application to route through MVC files.

Changes made:
- Added `src/router.js` as the central router.
- Added `src/controllers/index.js` with `showHomePage`.
- Updated `server.js` so assignment routing goes through `app.use(router)`.
- Removed direct assignment GET routes from `server.js`.
- Renamed controller functions to W03-style names:
  - `showOrganizationsPage`
  - `showOrganizationDetailsPage`
  - `showProjectsPage`
  - `showProjectDetailsPage`
  - `showCategoriesPage`
  - `showCategoryDetailsPage`
- Renamed detail model functions to W03-style names:
  - `getOrganizationDetails`
  - `getProjectDetails`
  - `getCategoryDetails`
- Added helper aliases:
  - `getCategoriesByProjectId`
  - `getProjectsByCategoryId`
- Added error handling controller functions and error views.
- Verified that SQL remains in model files, not controllers or `server.js`.

### 4. Deployment and Professional Style

The app already had CSS and readable pages. These changes preserve the existing style while making the MVC behavior complete.

## Files Updated

- `server.js`
- `src/router.js`
- `src/controllers/index.js`
- `src/controllers/errors.js`
- `src/controllers/organizationController.js`
- `src/controllers/projectController.js`
- `src/controllers/categoryController.js`
- `src/models/organizations.js`
- `src/models/projects.js`
- `src/models/categories.js`
- `src/views/errors/404.ejs`
- `src/views/errors/500.ejs`

## Verification

Verified locally:
- `/organizations`
- `/projects`
- `/categories`
- `/organization/1`
- `/project/1`
- `/category/1`
- `/nope` returns a 404 page

JavaScript syntax checks passed for `server.js` and all files under `src`.
