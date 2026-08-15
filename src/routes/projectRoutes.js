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

import { requireRole } from "../middleware/authMiddleware.js";

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

// Create - ADMIN ONLY
router.get(
  "/new",
  requireRole("admin"),
  showNewProjectPage
);

router.post(
  "/new",
  requireRole("admin"),
  projectValidationRules,
  processNewProject
);

// Edit - ADMIN ONLY
router.get(
  "/:id/edit",
  requireRole("admin"),
  showEditProjectPage
);

router.post(
  "/:id/edit",
  requireRole("admin"),
  projectValidationRules,
  processEditProject
);

// Assign categories - ADMIN ONLY
router.get(
  "/:id/categories",
  requireRole("admin"),
  showAssignCategoriesPage
);

router.post(
  "/:id/categories",
  requireRole("admin"),
  processAssignCategories
);

// Project details
router.get("/:id", showProjectDetailsPage);

export default router;