const express = require("express");

const Router = express.Router();
const workerController = require("./workerController");
const authMiddleware = require("../../middleware/auth");

// Router.get("/cek", authController.registerPekerja);
Router.patch(
  "/update-wroker/:username",
  authMiddleware.authentication,
  workerController.updatePersonalData
);
Router.get("/get-worker/:username", workerController.getWorkerByUsername);
Router.post(
  "/post-worker-exp",
  authMiddleware.authentication,
  workerController.postWorkerExp
);
Router.get(
  "/get-worker-exp/:username",
  workerController.getWorkerExpByUsername
);

module.exports = Router;
