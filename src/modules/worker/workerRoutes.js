const express = require("express");

const Router = express.Router();
const workerController = require("./workerController");

// Router.get("/cek", authController.registerPekerja);
Router.patch("/update-wroker/:username", workerController.updatePersonalData);
Router.get("/get-worker/:username", workerController.getWorkerByUsername);
Router.post("/post-skill", workerController.postSkill);
Router.patch("/update-skill/:username", workerController.updateSkill);
Router.post("/post-worker-exp", workerController.postWorkerExp);
Router.get(
  "/get-worker-exp/:username",
  workerController.getWorkerExpByUsername
);

module.exports = Router;
