const express = require("express");

const Router = express.Router();
const authRoutes = require("../modules/auth/authRoutes");

Router.use("/auth", authRoutes);

module.exports = Router;
