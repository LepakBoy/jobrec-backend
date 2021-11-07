const authModel = require("./authModel");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const helperWrapper = require("../../helpers/wrapper");
const bcrypt = require("bcrypt");
const sendMail = require("../../helpers/email");
require("dotenv").config();

module.exports = {
  registerWorker: async (req, res) => {
    try {
      const { username, name, email, password, nohp } = req.body;

      const hash = await bcrypt.hash(password, 10);
      const checkUserData = await authModel.checkUserData(
        username,
        email,
        nohp
      );

      const setData = {
        username,
        name,
        email,
        password: hash,
        nohp,
      };

      if (checkUserData.length > 0) {
        // console.log(checkUserData[0].username);
        if (checkUserData[0].username === setData.username) {
          return helperWrapper.response(
            res,
            400,
            `Username Telah Digunakan`,
            null
          );
        } else if (checkUserData[0].email === setData.email) {
          return helperWrapper.response(
            res,
            400,
            `Email Telah Digunakan`,
            null
          );
        } else if (checkUserData[0].nohp === setData.nohp) {
          return helperWrapper.response(
            res,
            400,
            `Nomor Telefon Telah Digunakan`,
            null
          );
        }
      }

      const setDataEmail = {
        to: email,
        subject: "Email Verifcation",
        template: "email-verification",
        data: {
          name: setData.name,
          email: email,
          link: `${process.env.APP_URL}auth/activate-account/${setData.username}`,
        },
        attachment: [],
      };

      // disable while development
      // await sendMail.verificationAccount(setDataEmail);

      const result = await authModel.register(setData);
      return helperWrapper.response(res, 200, `get data`, result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  accountActivation: async (req, res) => {
    try {
      const { username } = req.params;
      const status = "active";
      const setData = {
        username,
        status,
      };

      const result = await authModel.activationAccount(setData);

      return helperWrapper.response(
        res,
        200,
        `success activate account`,
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  login: async (req, res) => {
    try {
      const { email, username, nohp } = req.body;
      const checkUserData = await authModel.checkUserData(
        username,
        email,
        nohp
      );

      // if (checkUserData.length < 1) {
      //   return helperWrapper.response(res, 400, `email not registred`, null);
      // }

      console.log(checkUserData);
      return helperWrapper.response(res, 200, `success login`, checkUserData);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
};
