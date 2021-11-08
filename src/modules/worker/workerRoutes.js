const express = require("express");

const Router = express.Router();
const workerController = require("./workerController");
const UploadImage = require("../../middleware/imageAvatar");

// Router.get("/cek", authController.registerPekerja);

// Pekerja (Worker)
Router.patch(
  "/update-wroker/:username",
  UploadImage,
  workerController.updatePersonalData
);
Router.get("/get-worker/:username", workerController.getWorkerByUsername);
Router.patch(
  "/update-password-worker/:username",
  workerController.updatePasswordWorker
);

module.exports = Router;
