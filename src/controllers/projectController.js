import {
  getAllProjects,
  getProjectDetails,
  getCategoriesByProject,
  updateProjectCategories,
} from "../models/projects.js";

import { getAllCategories } from "../models/categories.js";

const showProjectsPage = async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.render("projects", {
      title: "Service Projects",
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const showProjectDetailsPage = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await getProjectDetails(id);

    if (!project) {
      return res.status(404).send("Project not found");
    }

    const categories = await getCategoriesByProject(id);

    res.render("project-details", {
      title: project.title,
      project,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const showAssignCategoriesPage = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    if (!project) {
      return res.status(404).send("Project not found");
    }

    const allCategories = await getAllCategories();
    const assignedCategories = await getCategoriesByProject(projectId);

    const assignedCategoryIds = assignedCategories.map(
      (category) => category.category_id
    );

    res.render("assign-categories", {
      title: "Assign Categories",
      project,
      categories: allCategories,
      assignedCategoryIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const processAssignCategories = async (req, res) => {
  try {
    const projectId = req.params.id;

    let categoryIds = req.body.categories || [];

    if (!Array.isArray(categoryIds)) {
      categoryIds = [categoryIds];
    }

    await updateProjectCategories(projectId, categoryIds);

    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export {
  showProjectsPage,
  showProjectDetailsPage,
  showAssignCategoriesPage,
  processAssignCategories,
};