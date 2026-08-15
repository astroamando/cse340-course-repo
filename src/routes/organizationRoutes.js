import express from "express";
import { body } from "express-validator";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationPage,
  processNewOrganization,
  showEditOrganizationPage,
  processEditOrganization,
} from "../controllers/organizationController.js";

import { requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

const organizationValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Organization name must be between 3 and 100 characters."
    ),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),

  body("contact_email")
    .trim()
    .notEmpty()
    .withMessage("Contact email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("logo_filename")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 })
    .withMessage("Logo filename must be no more than 255 characters."),
];

router.get("/", showOrganizationsPage);

// Create - ADMIN ONLY
router.get(
  "/new",
  requireRole("admin"),
  showNewOrganizationPage
);

router.post(
  "/new",
  requireRole("admin"),
  organizationValidationRules,
  processNewOrganization
);

// Edit - ADMIN ONLY
router.get(
  "/:id/edit",
  requireRole("admin"),
  showEditOrganizationPage
);

router.post(
  "/:id/edit",
  requireRole("admin"),
  organizationValidationRules,
  processEditOrganization
);

// Details
router.get("/:id", showOrganizationDetailsPage);

export default router;