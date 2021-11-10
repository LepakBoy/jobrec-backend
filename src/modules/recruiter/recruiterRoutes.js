const express = require("express");

const Router = express.Router();
const recruiterController = require("./recruiterController");
const middlewareAuth = require("../../middleware/auth");
const middlewareRecruiter = require("../../middleware/imageRecruiter");

Router.get(
  "/update-password/:id",
  middlewareAuth.authentication,
  recruiterController.updatePassword
);
Router.get("/:id", recruiterController.getPerusahaanById);
Router.patch(
  "/update-profile",
  middlewareAuth.authentication,
  recruiterController.updatePerusahaan
);
Router.patch(
  "/update-recruiter-image",
  middlewareAuth.authentication,
  middlewareRecruiter,
  recruiterController.updateImagePerusahaan
);
Router.post(
  "/hire-worker",
  middlewareAuth.authentication,
  recruiterController.hireWorker
);
module.exports = Router;
