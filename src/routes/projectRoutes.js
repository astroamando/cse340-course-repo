import express from "express";

import {
  showProjectsPage,
  showProjectDetailsPage,
  showAssignCategoriesPage,
  processAssignCategories,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", showProjectsPage);

// Assign categories to a project
router.get("/:id/categories", showAssignCategoriesPage);
router.post("/:id/categories", processAssignCategories);

// Project details
router.get("/:id", showProjectDetailsPage);

export default router;