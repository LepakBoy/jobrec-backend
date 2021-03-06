const express = require("express");

const Router = express.Router();
const authRoutes = require("../modules/auth/authRoutes");
const workerRoutes = require("../modules/worker/workerRoutes");
const recruiterRoutes = require("../modules/recruiter/recruiterRoutes");
const pengalamanRoutes = require("../modules/Pengalaman/pengalamanRoutes");

const skillRoutes = require("../modules/skill/skillRoutes");
const portofolioRoutes = require("../modules/portfolio/portofolioRoutes");

Router.use("/auth", authRoutes);
Router.use("/worker", workerRoutes);
Router.use("/auth", authRoutes);
Router.use("/skill", skillRoutes);
Router.use("/portofolio", portofolioRoutes);
Router.use("/recruiter", recruiterRoutes);
Router.use("/pengalaman", pengalamanRoutes);

module.exports = Router;
