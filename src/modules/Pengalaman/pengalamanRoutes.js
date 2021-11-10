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
  // redis.clearWorkerExp,
=======
  redis.clearWorkerExp,
>>>>>>> 7b39d12354ea4909397af4209318a000110dfe24
  pengalamanController.postWorkerExp
);
Router.get(
  "/get-worker-exp",
  authMiddleware.authentication,
<<<<<<< HEAD
  // redis.getWorkerExpByUsername,
=======
  redis.getWorkerExpByUsername,
>>>>>>> 7b39d12354ea4909397af4209318a000110dfe24
  pengalamanController.getWorkerExpByUsername
);
Router.get(
  "/get-worker-exp-id/:id",
  authMiddleware.authentication,
<<<<<<< HEAD
  // redis.getWorkerExpById,
=======
  redis.getWorkerExpById,
>>>>>>> 7b39d12354ea4909397af4209318a000110dfe24
  pengalamanController.getWorkerExpById
);
Router.delete(
  "/delete-worker-exp",
  authMiddleware.authentication,
<<<<<<< HEAD
  // redis.clearWorkerExp,
=======
  redis.clearWorkerExp,
>>>>>>> 7b39d12354ea4909397af4209318a000110dfe24
  pengalamanController.deletedWorkerExp
);

Router.patch(
  "/update-wroker-exp",
  authMiddleware.authentication,
<<<<<<< HEAD
  // redis.clearWorkerExp,
=======
  redis.clearWorkerExp,
>>>>>>> 7b39d12354ea4909397af4209318a000110dfe24
  pengalamanController.updateWorkerExp
);

Router;

module.exports = Router;
