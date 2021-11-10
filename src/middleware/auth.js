/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");
const helperWrapper = require("../helpers/wrapper");
const redis = require("../config/redis");

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      return helperWrapper.response(res, 403, "Please Login First");
    }
    token = token.split(" ")[1];
    redis.get(`accessToken:${token}`, (error, result) => {
      if (!error && result !== null) {
        return helperWrapper.response(
          res,
          403,
          "Your token is destroyed please login again"
        );
      }
    });
    jwt.verify(token, process.env.JWT_SECRETE_KEY, (error, result) => {
      if (error) {
        return helperWrapper.response(res, 403, error.message);
      }
      req.decodeToken = result;
      return next();
    });
  },
  isForgotnRegister: (req, res, next) => {
    let token = req.params.username;
    jwt.verify(token, process.env.JWT_SECRETE_KEY, (error, result) => {
      if (error) {
        if (error.message == "jwt expired") {
          return helperWrapper.response(
            res,
            403,
            "Token JWT Sudah Telat, Silahkan Kirim Ulang"
          );
        }
        return helperWrapper.response(res, 403, error.message);
      }
      req.decodeToken = result;
      return next();
    });
  },
};
