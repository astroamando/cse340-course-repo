import bcrypt from "bcrypt";
import * as userModel from "../models/users.js";

const buildRegister = async (req, res) => {
  res.render("users/register", {
    title: "Register",
  });};

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return res.render("users/register", {
        title: "Register",
        error: "An account with that email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser(
      first_name,
      last_name,
      email,
      hashedPassword,
      "user"
    );

    req.flash("notice", "Registration successful. Please log in.");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to register user.");
  }
};

const buildLogin = async (req, res) => {
  res.render("users/login", {
    title: "Login",
  });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.render("users/login", {
        title: "Login",
        error: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.render("users/login", {
        title: "Login",
        error: "Invalid email or password.",
      });
    }

    req.session.user = {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };

    req.flash("notice", "Login successful.");
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to log in.");
  }
};

const logoutUser = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Unable to log out.");
    }

    res.redirect("/?notice=You have been logged out.");
  });
};

const buildUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();

    res.render("users/index", {
      title: "Registered Users",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to load users.");
  }
};

export {
  buildRegister,
  registerUser,
  buildLogin,
  loginUser,
  logoutUser,
  buildUsers,
};