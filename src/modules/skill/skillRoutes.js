const express = require("express");
const Router = express.Router();
const skillController = require("./skillController");

Router.get("/", skillController.getAllSkillByUsername);
Router.post("/", skillController.createSkill);
Router.patch("/update/:id", skillController.updatedSkill);
Router.delete("/delete/:id", skillController.deletedSkill);

module.exports = Router;
