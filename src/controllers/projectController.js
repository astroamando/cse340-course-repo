import { validationResult } from "express-validator";

import {
  getAllProjects,
  getProjectDetails,
  getCategoriesByProject,
  updateProjectCategories,
  createProject,
  updateProject,
} from "../models/projects.js";

import { getAllCategories } from "../models/categories.js";
import { getAllOrganizations } from "../models/organizations.js";

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

const showNewProjectPage = async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("new-project", {
      title: "Create New Project",
      organizations,
      project: {
        organization_id: "",
        title: "",
        description: "",
        location: "",
        date: "",
      },
      errors: [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const processNewProject = async (req, res) => {
  try {
    const {
      organization_id,
      title,
      description,
      location,
      date,
    } = req.body;

    const organizations = await getAllOrganizations();

    const project = {
      organization_id,
      title,
      description,
      location,
      date,
    };

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors
        .array()
        .map((error) => error.msg);

      return res.status(400).render("new-project", {
        title: "Create New Project",
        organizations,
        project,
        errors,
      });
    }

    const newProject = await createProject(
      organization_id,
      title.trim(),
      description.trim(),
      location.trim(),
      date
    );

    return res.redirect(
      `/projects/${newProject.project_id}?notice=` +
        encodeURIComponent(
          "The project was successfully created."
        )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const showEditProjectPage = async (req, res) => {
  try {
    const id = req.params.id;

    const project = await getProjectDetails(id);

    if (!project) {
      return res.status(404).send("Project not found");
    }

    const organizations = await getAllOrganizations();

    res.render("edit-project", {
      title: "Edit Project",
      project,
      organizations,
      errors: [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const processEditProject = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      organization_id,
      title,
      description,
      location,
      date,
    } = req.body;

    const organizations = await getAllOrganizations();

    const project = {
      project_id: id,
      organization_id,
      title,
      description,
      location,
      date,
    };

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors
        .array()
        .map((error) => error.msg);

      return res.status(400).render("edit-project", {
        title: "Edit Project",
        project,
        organizations,
        errors,
      });
    }

    const updatedProject = await updateProject(
      id,
      organization_id,
      title.trim(),
      description.trim(),
      location.trim(),
      date
    );

    if (!updatedProject) {
      return res.status(404).send("Project not found");
    }

    return res.redirect(
      `/projects/${id}?notice=` +
        encodeURIComponent(
          "The project was successfully updated."
        )
    );
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
    const assignedCategories =
      await getCategoriesByProject(projectId);

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

    res.redirect(
      `/projects/${projectId}?notice=` +
        encodeURIComponent(
          "The project categories were successfully updated."
        )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectPage,
  processNewProject,
  showEditProjectPage,
  processEditProject,
  showAssignCategoriesPage,
  processAssignCategories,
};