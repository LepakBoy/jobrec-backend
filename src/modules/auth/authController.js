const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const helperWrapper = require("../../helper/");
const authModel = require("./authModel");
const bcrypt = require("bcrypt");
const sendMail = require("../../helper/email");

module.exports = {
  registerPekerja: async (req, res) => {
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
          return helperWrapper.response(res, 400, `username sama`, null);
        } else if (checkUserData[0].email === setData.email) {
          return helperWrapper.response(res, 400, `email sama`, null);
        } else if (checkUserData[0].nohp === setData.nohp) {
          return helperWrapper.response(res, 400, `no hp sama`, null);
        }
      }

      const setDataEmail = {
        to: email,
        subject: "Email Verifcation",
        template: "email-verification",
        data: {
          name: setData.name,
          email: email,
          link: `http://localhost:3000/auth/activate-account/${setData.username}`,
        },
        attachment: [],
      };

      await sendMail.verificationAccount(setDataEmail);

      const result = await authModel.register(setData);
      return helperWrapper.response(res, 200, `get data`, result);
    } catch (error) {
      console.log(error);
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
};
