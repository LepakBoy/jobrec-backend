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
<<<<<<< HEAD
  redis.clearWorkerExp,
=======
  // redis.clearWorkerExp,
>>>>>>> fikri
  pengalamanController.postWorkerExp
);
Router.get(
  "/get-worker-exp",
  authMiddleware.authentication,
<<<<<<< HEAD
  redis.getWorkerExpByUsername,
=======
  // redis.getWorkerExpByUsername,
>>>>>>> fikri
  pengalamanController.getWorkerExpByUsername
);
Router.get(
  "/get-worker-exp-id/:id",
  authMiddleware.authentication,
<<<<<<< HEAD
  redis.getWorkerExpById,
=======
  // redis.getWorkerExpById,
>>>>>>> fikri
  pengalamanController.getWorkerExpById
);
Router.delete(
  "/delete-worker-exp/:id",
  authMiddleware.authentication,
<<<<<<< HEAD
  redis.clearWorkerExp,
=======
  // redis.clearWorkerExp,
>>>>>>> fikri
  pengalamanController.deletedWorkerExp
);

Router.patch(
  "/update-wroker-exp/:id",
  authMiddleware.authentication,
  // redis.clearWorkerExp,
  pengalamanController.updateWorkerExp
);

Router;

module.exports = Router;
