const express = require("express");
const Router = express.Router();
const skillController = require("./skillController");
const authMiddleware = require("../../middleware/auth");
Router.get(
  "/",
  authMiddleware.authentication,
  skillController.getAllSkillByUsername
);
Router.post("/", authMiddleware.authentication, skillController.createSkill);
Router.patch(
  "/update/:id",
  authMiddleware.authentication,
  skillController.updatedSkill
);
Router.delete(
  "/delete/:id",
  authMiddleware.authentication,
  skillController.deletedSkill
);

module.exports = Router;
