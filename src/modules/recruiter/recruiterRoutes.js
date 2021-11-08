const express = require("express");

const Router = express.Router();
const recuiterController = require("./recruiterController");
const authMiddleware = require("../../middleware/auth");

Router.get(
  "/update-password/:username",
  authMiddleware.authentication,
  recuiterController.updatePassword
);

module.exports = Router;
