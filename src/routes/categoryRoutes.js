import express from "express";
import { body } from "express-validator";

import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryPage,
  processNewCategory,
  showEditCategoryPage,
  processEditCategory,
} from "../controllers/categoryController.js";

import { requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

const categoryValidationRules = [
  body("category_name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "Category name must be between 2 and 100 characters."
    ),
];

router.get("/", showCategoriesPage);

// Create - ADMIN ONLY
router.get(
  "/new-category",
  requireRole("admin"),
  showNewCategoryPage
);

router.post(
  "/new-category",
  requireRole("admin"),
  categoryValidationRules,
  processNewCategory
);

// Edit - ADMIN ONLY
router.get(
  "/edit-category/:id",
  requireRole("admin"),
  showEditCategoryPage
);

router.post(
  "/edit-category/:id",
  requireRole("admin"),
  categoryValidationRules,
  processEditCategory
);

// Category details
router.get("/:id", showCategoryDetailsPage);

export default router;