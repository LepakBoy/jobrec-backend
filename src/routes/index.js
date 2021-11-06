const express = require("express");

const Router = express.Router();
const authRoutes = require("../modules/auth/authRoutes");
const skillRoutes = require("../modules/skill/skillRoutes");

Router.use("/auth", authRoutes);
Router.use("/skill", skillRoutes);

module.exports = Router;
