import express from "express";
import { showHomePage, showDashboard } from "./controllers/index.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/users.js";
import { testErrorPage } from "./controllers/errors.js";
import { requireLogin } from "./middleware/authMiddleware.js";

const router = express.Router();

router.get("/", showHomePage);

router.get("/dashboard", requireLogin, showDashboard);

router.use("/organizations", organizationRoutes);
router.use("/organization", organizationRoutes);

router.use("/projects", projectRoutes);
router.use("/project", projectRoutes);

router.use("/categories", categoryRoutes);
router.use("/category", categoryRoutes);

router.use("/", userRoutes);

router.get("/test-error", testErrorPage);

export default router;