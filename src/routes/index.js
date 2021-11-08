const express = require("express");

const Router = express.Router();
const authRoutes = require("../modules/auth/authRoutes");
const workerRoutes = require("../modules/worker/workerRoutes");
// <<<<<<< HEAD
const recruiterRoutes = require("../modules/recruiter/recruiterRoutes");

Router.use("/auth", authRoutes);
Router.use("/worker", workerRoutes);
// =======
// >>>>>>> 7c190d2d48c4c873ee6496aeed2597cde58b622b
const skillRoutes = require("../modules/skill/skillRoutes");
const portofolioRoutes = require("../modules/portfolio/portofolioRoutes");

Router.use("/auth", authRoutes);
Router.use("/worker", workerRoutes);
Router.use("/auth", authRoutes);
Router.use("/skill", skillRoutes);
Router.use("/portofolio", portofolioRoutes);
Router.use("/recruiter", recruiterRoutes);

module.exports = Router;
