const express = require("express");

const Router = express.Router();
const workerController = require("./workerController");
const authMiddleware = require("../../middleware/auth");
const UploadImage = require("../../middleware/imageAvatar");

Router.get("/", workerController.getAllWorker);
Router.patch(
  "/update-wroker/:username",
  UploadImage,
  workerController.updatePersonalData
);
Router.get("/get-worker/:username", workerController.getWorkerByUsername);
Router.post("/post-worker-exp", workerController.postWorkerExp);
Router.get(
  "/get-worker-exp/:username",
  workerController.getWorkerExpByUsername
);
Router.delete("/delete-worker-exp/:id", workerController.deletedWorkerExp);

module.exports = Router;
