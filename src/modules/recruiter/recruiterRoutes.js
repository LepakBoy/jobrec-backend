const express = require("express");

const Router = express.Router();
const recuiterController = require("./recruiterController");
const authMiddleware = require("../../middleware/auth");

Router.get("/rec/:username", recuiterController.getWorkerByUsername);

module.exports = Router;
