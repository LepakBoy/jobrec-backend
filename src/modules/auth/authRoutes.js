const express = require("express");

const Router = express.Router();
const authController = require("./authController");

// Router.get("/cek", authController.registerPekerja);
Router.post("/register", authController.registerPekerja);
Router.get("/activate-account/:username", authController.accountActivation);

module.exports = Router;
