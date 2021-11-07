const express = require("express");

const Router = express.Router();
const authRoutes = require("../modules/auth/authRoutes");
const workerRoutes = require("../modules/worker/workerRoutes");

Router.use("/auth", authRoutes);
Router.use("/worker", workerRoutes);

module.exports = Router;
