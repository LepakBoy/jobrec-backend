const express = require("express");
const Router = express.Router();
const portfolioController = require("./portofolioController");
const middlewarePortfolio = require("../../middleware/imagePortfolio");

Router.get("/", portfolioController.getPortofolioByUsername);
Router.post("/", middlewarePortfolio, portfolioController.createPortfolio);
Router.patch(
  "/update/:id",
  middlewarePortfolio,
  portfolioController.updatedPortofolio
);
Router.delete("/delete/:id", portfolioController.deletedPortofolio);

module.exports = Router;
