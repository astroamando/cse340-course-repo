import express from "express";
import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryPage,
  processNewCategory,
  showEditCategoryPage,
  processEditCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.get("/", showCategoriesPage);
router.get("/new-category", showNewCategoryPage);
router.post("/new-category", processNewCategory);
router.get("/edit-category/:id", showEditCategoryPage);
router.post("/edit-category/:id", processEditCategory);
router.get("/:id", showCategoryDetailsPage);
export default router;
