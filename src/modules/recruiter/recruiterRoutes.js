const express = require("express");

const Router = express.Router();
const recruiterController = require("./recruiterController");

Router.get("/:id", recruiterController.getPerusahaanById);
Router.patch("/:id", recruiterController.updatePerusahaan);

module.exports = Router;
