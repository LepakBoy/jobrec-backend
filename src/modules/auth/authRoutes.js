const express = require("express");

const Router = express.Router();
const authController = require("./authController");

Router.post("/register", authController.registerWorker);
Router.post("/login-pekerja", authController.loginPekerja);
Router.post("/login-perekrut", authController.loginPerekrut);
Router.post("/refresh", authController.refreshToken);
Router.post("/logout", authController.logout);
Router.get("/activate-account/:username", authController.accountActivation);

module.exports = Router;
