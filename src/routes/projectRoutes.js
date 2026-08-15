import express from "express";
import { body } from "express-validator";

import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectPage,
  processNewProject,
  showEditProjectPage,
  processEditProject,
  showAssignCategoriesPage,
  processAssignCategories,
} from "../controllers/projectController.js";

const router = express.Router();

const projectValidationRules = [
  body("organization_id")
    .notEmpty()
    .withMessage("Organization is required."),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Project title must be between 3 and 100 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required."),

  body("date")
    .notEmpty()
    .withMessage("Date is required.")
    .isISO8601()
    .withMessage("Please enter a valid date."),
];

// List all projects
router.get("/", showProjectsPage);

// Create a new project
router.get("/new", showNewProjectPage);
router.post("/new", projectValidationRules, processNewProject);

// Edit an existing project
router.get("/:id/edit", showEditProjectPage);
router.post("/:id/edit", projectValidationRules, processEditProject);

// Assign categories to a project
router.get("/:id/categories", showAssignCategoriesPage);
router.post("/:id/categories", processAssignCategories);

// Project details
router.get("/:id", showProjectDetailsPage);

export default router;