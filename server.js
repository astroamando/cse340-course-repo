import express from "express";
import session from "express-session";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import router from "./src/router.js";
import {
  showNotFoundPage,
  showErrorPage,
} from "./src/controllers/errors.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "cse340-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

app.use((req, res, next) => {
  res.locals.NODE_ENV = process.env.NODE_ENV || "production";
  res.locals.currentPath = req.path;
  res.locals.notice =
    typeof req.query.notice === "string" ? req.query.notice : "";

  res.locals.user = req.session.user || null;

  next();
});

app.use(router);
app.use(showNotFoundPage);
app.use(showErrorPage);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});