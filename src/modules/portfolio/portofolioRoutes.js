const express = require("express");
const Router = express.Router();
const portfolioController = require("./portofolioController");
const middlewarePortfolio = require("../../middleware/imagePortfolio");
const authMiddleware = require("../../middleware/auth");
const redis = require("../../middleware/redis");

Router.get(
  "/",
  authMiddleware.authentication,
  redis.getPortofolioByUsername,
  portfolioController.getPortofolioByUsername
);
Router.post(
  "/",
  authMiddleware.authentication,
  redis.clearPortofolio,
  middlewarePortfolio,
  portfolioController.createPortfolio
);
Router.patch(
  "/update/:id",
  middlewarePortfolio,
  redis.clearPortofolio,
  authMiddleware.authentication,
  portfolioController.updatedPortofolio
);
Router.delete(
  "/delete/:id",
  authMiddleware.authentication,
  redis.clearPortofolio,
  portfolioController.deletedPortofolio
);

module.exports = Router;
