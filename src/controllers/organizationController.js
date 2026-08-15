import { validationResult } from "express-validator";

import {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganization,
  createOrganization,
  updateOrganization,
} from "../models/organizations.js";

const showOrganizationsPage = async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const showOrganizationDetailsPage = async (req, res) => {
  try {
    const id = req.params.id;

    const organization = await getOrganizationDetails(id);

    if (!organization) {
      return res.status(404).send("Organization not found");
    }

    const projects = await getProjectsByOrganization(id);

    res.render("organization-details", {
      title: organization.name,
      organization,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const showNewOrganizationPage = (req, res) => {
  res.render("new-organization", {
    title: "Create New Organization",
    organization: {
      name: "",
      description: "",
      contact_email: "",
      logo_filename: "",
    },
    errors: [],
  });
};

const processNewOrganization = async (req, res) => {
  const name = (req.body.name || "").trim();
  const description = (req.body.description || "").trim();
  const contactEmail = (req.body.contact_email || "").trim();
  const logoFilename = (req.body.logo_filename || "").trim();

  const organization = {
    name,
    description,
    contact_email: contactEmail,
    logo_filename: logoFilename,
  };

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => error.msg);

    return res.status(400).render("new-organization", {
      title: "Create New Organization",
      organization,
      errors,
    });
  }

  try {
    await createOrganization(
      name,
      description,
      contactEmail,
      logoFilename || "default.png"
    );

    return res.redirect(
      "/organizations?notice=" +
        encodeURIComponent(
          "The organization was successfully created."
        )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const showEditOrganizationPage = async (req, res) => {
  try {
    const id = req.params.id;
    const organization = await getOrganizationDetails(id);

    if (!organization) {
      return res.status(404).send("Organization not found");
    }

    res.render("edit-organization", {
      title: "Edit Organization",
      organization,
      errors: [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const processEditOrganization = async (req, res) => {
  const id = req.params.id;

  const name = (req.body.name || "").trim();
  const description = (req.body.description || "").trim();
  const contactEmail = (req.body.contact_email || "").trim();

  try {
    const existingOrganization = await getOrganizationDetails(id);

    if (!existingOrganization) {
      return res.status(404).send("Organization not found");
    }

    const logoFilename =
      (req.body.logo_filename || "").trim() ||
      existingOrganization.logo_filename ||
      "default.png";

    const organization = {
      organization_id: id,
      name,
      description,
      contact_email: contactEmail,
      logo_filename: logoFilename,
    };

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors
        .array()
        .map((error) => error.msg);

      return res.status(400).render("edit-organization", {
        title: "Edit Organization",
        organization,
        errors,
      });
    }

    await updateOrganization(
      id,
      name,
      description,
      contactEmail,
      logoFilename
    );

    return res.redirect(
      `/organization/${id}?notice=` +
        encodeURIComponent(
          "The organization was successfully updated."
        )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationPage,
  processNewOrganization,
  showEditOrganizationPage,
  processEditOrganization,
};