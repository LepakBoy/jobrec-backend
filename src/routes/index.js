const express = require("express");

const Router = express.Router();
const authRoutes = require("../modules/auth/authRoutes");
const workerRoutes = require("../modules/worker/workerRoutes");
const pengalamanRoutes = require("../modules/Pengalaman/pengalamanRoutes");

Router.use("/auth", authRoutes);
Router.use("/worker", workerRoutes);
Router.use("/pengalaman", pengalamanRoutes);
const skillRoutes = require("../modules/skill/skillRoutes");
const portofolioRoutes = require("../modules/portfolio/portofolioRoutes");

Router.use("/auth", authRoutes);
Router.use("/skill", skillRoutes);
Router.use("/portofolio", portofolioRoutes);

module.exports = Router;
