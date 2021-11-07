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
        template: "register",
        data: {
          name: setData.name,
          email: email,
          link: `${process.env.APP_URL}/auth/activate-account/${setData.username}`,
        },
        attachment: [],
      };

      // disable while development
      await sendMail.verificationAccount(setDataEmail);

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
  loginPekerja: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUserData = await authModel.checkUserData(null, email);

      if (checkUserData.length < 1) {
        return helperWrapper.response(res, 400, `email not registred`, null);
      }

      //checking accountStatus isActive ?
      if (checkUserData[0].accountStatus !== "active") {
        return helperWrapper.response(
          res,
          400,
          `check your email for account acticvation`,
          null
        );
      }

      //compare password
      const validPass = await bcrypt.compare(
        password,
        checkUserData[0].password
      );
      if (!validPass) {
        return helperWrapper.response(res, 400, `wrong password`);
      }

      //declare payload
      const payload = checkUserData[0];
      delete payload.password;
      payload.role = "pekerja";

      //generate token
      const token = jwt.sign({ ...payload }, process.env.JWT_SECRETE_KEY, {
        expiresIn: "1h",
      });

      //generate refresh token
      const refreshToken = jwt.sign(
        { ...payload },
        process.env.JWT_SECRETE_KEY,
        { expiresIn: "24h" }
      );

      return helperWrapper.response(res, 200, `success login`, {
        username: payload.username,
        token,
        refreshToken,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  loginPerekrut: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkPerekrutData = await authModel.checkPerekrutData(null, email);

      if (checkPerekrutData.length < 1) {
        return helperWrapper.response(res, 400, `email not registred`, null);
      }
      if (checkPerekrutData[0].accountStatus !== "active") {
        return helperWrapper.response(
          res,
          400,
          `check your email for account acticvation`,
          null
        );
      }
      //compare password
      const validPass = await bcrypt.compare(
        password,
        checkPerekrutData[0].password
      );
      if (!validPass) {
        return helperWrapper.response(res, 400, `wrong password`);
      }

      //declare payload
      const payload = checkPerekrutData[0];
      delete payload.password;
      payload.role = "pekerja";

      //generate token
      const token = jwt.sign({ ...payload }, process.env.JWT_SECRETE_KEY, {
        expiresIn: "1h",
      });

      //generate refresh token
      const refreshToken = jwt.sign(
        { ...payload },
        process.env.JWT_SECRETE_KEY,
        { expiresIn: "24h" }
      );

      return helperWrapper.response(res, 200, `success login`, {
        username: payload.username,
        token,
        refreshToken,
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  logout: async (req, res) => {
    try {
      let token = req.headers.authorization;

      token = token.split(" ")[1];

      //redis ================================================

      return helperWrapper.response(res, 200, `success logout`, null);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  refreshToken: async (req, res) => {
    try {
      console.log(req.body);
      const { refreshToken } = req.body;
      // redis.get(`refreshToken:${refreshToken}`, (error, result) => {
      //   if (!error && result !== null) {
      //     return helperWrapper.response(
      //       res,
      //       403,
      //       "Your refresh token cannot be use"
      //     );
      //   }
      //   jwt.verify(refreshToken, process.env.JWT_PRIVATE, (error, result) => {
      //     if (error) {
      //       return helperWrapper.response(res, 403, error.message);
      //     }
      //     delete result.iat;
      //     delete result.exp;
      //     const token = jwt.sign(result, process.env.JWT_PRIVATE, {
      //       expiresIn: "1h",
      //     });
      //     const newRefreshToken = jwt.sign(result, process.env.JWT_PRIVATE, {
      //       expiresIn: "24h",
      //     });
      //     return helperWrapper.response(res, 200, "Success Refresh Token !", {
      //       id: result.id,
      //       token,
      //       refreshToken: newRefreshToken,
      //     });
      //   });
      // });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};
