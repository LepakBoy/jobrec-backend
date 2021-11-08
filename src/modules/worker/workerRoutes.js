const express = require("express");

const Router = express.Router();
const workerController = require("./workerController");
<<<<<<< HEAD
const authMiddleware = require("../../middleware/auth");
=======
const UploadImage = require("../../middleware/imageAvatar");
>>>>>>> 76bd6ff5c38a6efbbd9553dd34163e18bb2e3035

// Router.get("/cek", authController.registerPekerja);
Router.patch(
  "/update-wroker/:username",
<<<<<<< HEAD
  authMiddleware.authentication,
  workerController.updatePersonalData
);
Router.get("/get-worker/:username", workerController.getWorkerByUsername);
Router.post(
  "/post-worker-exp",
  authMiddleware.authentication,
  workerController.postWorkerExp
);
=======
  UploadImage,
  workerController.updatePersonalData
);
Router.get("/get-worker/:username", workerController.getWorkerByUsername);
Router.post("/post-worker-exp", workerController.postWorkerExp);
>>>>>>> 76bd6ff5c38a6efbbd9553dd34163e18bb2e3035
Router.get(
  "/get-worker-exp/:username",
  workerController.getWorkerExpByUsername
);
Router.delete("/delete-worker-exp/:id", workerController.deletedWorkerExp);

module.exports = Router;
