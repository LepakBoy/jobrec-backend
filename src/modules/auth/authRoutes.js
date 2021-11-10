const express = require("express");

const Router = express.Router();
const authController = require("./authController");
const authMiddleware = require("../../middleware/auth");

Router.post("/register", authController.registerWorker);
Router.post("/register-recruiter", authController.registerRecruiter);
Router.post("/login", authController.loginWorker);
Router.post("/login-recruiter", authController.loginRecruiter);
Router.post("/logout", authController.logout);
Router.get(
  "/activate-account/:username",
  authMiddleware.isForgotnRegister,
  authController.accountActivation
);
Router.get(
  "/activate-account-recruiter/:id",
  authController.accountRecruiterActivation
);
Router.get("/forgot-password-process/", authController.forgotPasswordProcess);
Router.post(
  "/forgot-password/:username",
  authMiddleware.isForgotnRegister,
  authController.forgotPassword
);

module.exports = Router;
