const express = require("express");

const Router = express.Router();
const pengalamanController = require("./pengalamanController");
const authMiddleware = require("../../middleware/auth");
const redis = require("../../middleware/redis");

// Router.get("/cek", authController.registerPekerja);

// Pengalaman Pekerja
Router.post(
  "/post-worker-exp",
  authMiddleware.authentication,
  // redis.clearWorkerExp,
  pengalamanController.postWorkerExp
);
Router.get(
  "/get-worker-exp",
  authMiddleware.authentication,
  // redis.getWorkerExpByUsername,
  pengalamanController.getWorkerExpByUsername
);
Router.get(
  "/get-worker-exp-id/:id",
  authMiddleware.authentication,
  // redis.getWorkerExpById,
  pengalamanController.getWorkerExpById
);
Router.delete(
  "/delete-worker-exp/:id",
  authMiddleware.authentication,
  // redis.clearWorkerExp,
  pengalamanController.deletedWorkerExp
);

Router.patch(
  "/update-wroker-exp",
  authMiddleware.authentication,
  // redis.clearWorkerExp,
  pengalamanController.updateWorkerExp
);

Router;

module.exports = Router;
