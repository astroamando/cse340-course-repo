import express from "express";
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationPage,
  processNewOrganization,
  showEditOrganizationPage,
  processEditOrganization,
} from "../controllers/organizationController.js";

const router = express.Router();

router.get("/", showOrganizationsPage);

// Create a new organization
router.get("/new", showNewOrganizationPage);
router.post("/new", processNewOrganization);

// Edit an organization
router.get("/:id/edit", showEditOrganizationPage);
router.post("/:id/edit", processEditOrganization);

// Organization details
router.get("/:id", showOrganizationDetailsPage);

export default router;