const express = require("express");
const Router = express.Router();
const skillController = require("./skillController");
const authMiddleware = require("../../middleware/auth");
Router.get(
  "/",
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  skillController.getAllSkillByUsername
);
Router.post("/", skillController.createSkill);
Router.patch("/update/:id", skillController.updatedSkill);
Router.delete("/delete/:id", skillController.deletedSkill);

module.exports = Router;
