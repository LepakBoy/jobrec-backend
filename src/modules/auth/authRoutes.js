const express = require("express");

const Router = express.Router();
const authController = require("./authController");

Router.post("/register", authController.registerWorker);
Router.post("/register-recruiter", authController.registerRecruiter);
Router.post("/login", authController.login);
Router.post("/login-recruiter", authController.loginRecruiter);
Router.post("/logout", authController.logout);
Router.get("/activate-account/:username", authController.accountActivation);
Router.get(
  "/activate-account-recruiter/:id",
  authController.accountRecruiterActivation
);

module.exports = Router;
