const express = require("express");

const Router = express.Router();
const workerController = require("./workerController");
const authMiddleware = require("../../middleware/auth");
const UploadImage = require("../../middleware/imageAvatar");

Router.get("/", workerController.getAllWorker);
Router.patch(
  "/update-worker",
  authMiddleware.authentication,
  workerController.updatePersonalData
);
Router.patch(
  "/update-avatar",
  authMiddleware.authentication,
  UploadImage,
  workerController.updateAvatar
);
Router.get("/get-worker/:username", workerController.getWorkerByUsername);
Router.patch(
  "/update-password-worker",
  authMiddleware.authentication,
  workerController.updatePasswordWorker
);
Router.delete("/delete-worker-exp/:id", workerController.deletedWorkerExp);

module.exports = Router;
