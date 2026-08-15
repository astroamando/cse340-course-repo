import { validationResult } from "express-validator";

import {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategory,
  createCategory,
  updateCategory,
} from "../models/categories.js";

const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const category = await getCategoryDetails(req.params.id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    const projects = await getProjectsByCategory(req.params.id);

    res.render("category-details", {
      title: category.name,
      category,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

const showNewCategoryPage = (req, res) => {
  res.render("new-category", {
    title: "Create New Category",
    categoryName: "",
    errors: [],
  });
};

const processNewCategory = async (req, res, next) => {
  const categoryName = (req.body.category_name || "").trim();

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => error.msg);

    return res.status(400).render("new-category", {
      title: "Create New Category",
      categoryName,
      errors,
    });
  }

  try {
    await createCategory(categoryName);

    return res.redirect(
      "/categories?notice=" +
        encodeURIComponent(
          "The category was successfully created."
        )
    );
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).render("new-category", {
        title: "Create New Category",
        categoryName,
        errors: ["That category already exists."],
      });
    }

    next(error);
  }
};

const showEditCategoryPage = async (req, res, next) => {
  try {
    const category = await getCategoryDetails(req.params.id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("edit-category", {
      title: "Edit Category",
      category,
      errors: [],
    });
  } catch (error) {
    next(error);
  }
};

const processEditCategory = async (req, res, next) => {
  const categoryName = (req.body.category_name || "").trim();

  const category = {
    category_id: req.params.id,
    name: categoryName,
  };

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => error.msg);

    return res.status(400).render("edit-category", {
      title: "Edit Category",
      category,
      errors,
    });
  }

  try {
    const updated = await updateCategory(
      req.params.id,
      categoryName
    );

    if (!updated) {
      return res.status(404).send("Category not found");
    }

    return res.redirect(
      "/categories?notice=" +
        encodeURIComponent(
          "The category was successfully updated."
        )
    );
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).render("edit-category", {
        title: "Edit Category",
        category,
        errors: ["That category already exists."],
      });
    }

    next(error);
  }
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryPage,
  processNewCategory,
  showEditCategoryPage,
  processEditCategory,
};