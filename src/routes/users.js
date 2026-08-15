import express from "express";
import {
  buildRegister,
  registerUser,
  buildLogin,
  loginUser,
  logoutUser,
  buildUsers,
} from "../controllers/userController.js";

import {
  requireRole,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/register", buildRegister);
router.post("/register", registerUser);

router.get("/login", buildLogin);
router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get(
  "/users",
  requireRole("admin"),
  buildUsers
);

export default router;