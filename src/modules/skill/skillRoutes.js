const express = require("express");
const Router = express.Router();
const skillController = require("./skillController");
const authMiddleware = require("../../middleware/auth");
const redis = require("../../middleware/redis");

Router.get(
  "/",
  authMiddleware.authentication,
  redis.getSkillByUsername,
  skillController.getAllSkillByUsername
);
Router.post(
  "/",
  authMiddleware.authentication,
  redis.clearSkill,
  skillController.createSkill
);
Router.patch(
  "/update/:id",
  authMiddleware.authentication,
  redis.clearSkill,
  skillController.updatedSkill
);
Router.delete(
  "/delete/:id",
  authMiddleware.authentication,
  redis.clearSkill,

  skillController.deletedSkill
);

module.exports = Router;
