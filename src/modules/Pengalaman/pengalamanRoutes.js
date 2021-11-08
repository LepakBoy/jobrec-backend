const express = require("express");

const Router = express.Router();
const pengalamanController = require("./pengalamanController");
const UploadImage = require("../../middleware/imageAvatar");

// Router.get("/cek", authController.registerPekerja);

// Pengalaman Pekerja
Router.post("/post-worker-exp", pengalamanController.postWorkerExp);
Router.get(
  "/get-worker-exp/:username",
  pengalamanController.getWorkerExpByUsername
);
Router.delete("/delete-worker-exp/:id", pengalamanController.deletedWorkerExp);

module.exports = Router;
