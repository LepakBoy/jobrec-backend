const express = require("express");

const Router = express.Router();
const recruiterController = require("./recruiterController");
const middlewareAuth = require("../../middleware/auth")

Router.get("/:id", recruiterController.getPerusahaanById);
Router.patch("/update-profile/:id", recruiterController.updatePerusahaan);
Router.patch("/update-recruiter-image/:id", middlewareAuth.authentication, recruiterController.updateImagePerusahaan)

module.exports = Router;
