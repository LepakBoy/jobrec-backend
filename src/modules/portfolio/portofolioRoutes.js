const express = require("express");
const Router = express.Router();
const portfolioController = require("./portofolioController");
const middlewarePortfolio = require("../../middleware/imagePortfolio");
const authMiddleware = require("../../middleware/auth");

Router.get(
  "/",
  authMiddleware.authentication,
  portfolioController.getPortofolioByUsername
);
Router.post(
  "/",
  authMiddleware.authentication,
  middlewarePortfolio,
  portfolioController.createPortfolio
);
Router.patch(
  "/update/:id",
  middlewarePortfolio,
  authMiddleware.authentication,
  portfolioController.updatedPortofolio
);
Router.delete(
  "/delete/:id",
  authMiddleware.authentication,
  portfolioController.deletedPortofolio
);

module.exports = Router;
