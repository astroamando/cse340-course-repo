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

router.get("/new-category", showNewCategoryPage);
router.post(
  "/new-category",
  categoryValidationRules,
  processNewCategory
);

router.get("/edit-category/:id", showEditCategoryPage);
router.post(
  "/edit-category/:id",
  categoryValidationRules,
  processEditCategory
);

router.get("/:id", showCategoryDetailsPage);

export default router;