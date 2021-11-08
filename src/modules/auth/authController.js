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

      const checkRecruiterData = await authModel.checkRecruiterData(
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

      //validation data worker and recrutier
      if (checkRecruiterData.length > 0) {
        if (checkRecruiterData[0].email === email) {
          return helperWrapper.response(
            res,
            400,
            `email udh dipake perekrut`,
            null
          );
        }
        if (checkRecruiterData[0].nohp === nohp) {
          return helperWrapper.response(
            res,
            400,
            `hp udh dipake perekrut`,
            null
          );
        }
      }
      if (checkUserData.length > 0) {
        if (checkUserData[0].email === email) {
          return helperWrapper.response(
            res,
            400,
            `email udh dipake user`,
            null
          );
        }
        if (checkUserData[0].nohp === nohp) {
          return helperWrapper.response(res, 400, `hp udh dipake user`, null);
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

  registerRecruiter: async (req, res) => {
    try {
      const { name, companyName, filed, email, password, nohp } = req.body;

      const hash = await bcrypt.hash(password, 10);

      //checking data from worker and recruiter
      const checkRecruiterData = await authModel.checkRecruiterData(
        email,
        nohp
      );
      const checkUserData = await authModel.checkUserData(null, email, nohp);

      const setData = {
        id: uuidv4(),
        nama_lengkap: name,
        nama_perusahaan: companyName,
        bidang: filed,
        email,
        password: hash,
        nohp,
      };

      //validation data worker and recrutier
      if (checkRecruiterData.length > 0) {
        if (checkRecruiterData[0].email === email) {
          return helperWrapper.response(
            res,
            400,
            `email udh dipake perekrut`,
            null
          );
        }
        if (checkRecruiterData[0].nohp === nohp) {
          return helperWrapper.response(
            res,
            400,
            `hp udh dipake perekrut`,
            null
          );
        }
      }
      if (checkUserData.length > 0) {
        if (checkUserData[0].email === email) {
          return helperWrapper.response(
            res,
            400,
            `email udh dipake user`,
            null
          );
        }
        if (checkUserData[0].nohp === nohp) {
          return helperWrapper.response(res, 400, `hp udh dipake user`, null);
        }
      }

      const setDataEmail = {
        to: email,
        subject: "Email Verifcation",
        template: "email-verification",
        data: {
          name: setData.nama_lengkap,
          email: email,
          link: `${process.env.APP_URL}/auth/activate-account-recruiter/${setData.id}`,
        },
        attachment: [],
      };

      // disable while development
      // await sendMail.verificationAccount(setDataEmail);

      const result = await authModel.registerRecruiter(setData);
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
  accountRecruiterActivation: async (req, res) => {
    try {
      const { id } = req.params;
      const status = "active";
      const setData = {
        id,
        status,
      };

      const result = await authModel.activationRecruiterAccount(setData);

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
  accountActivation: async (req, res) => {
    try {
      const { id } = req.params;
      const status = "active";
      const setData = {
        id,
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
      const { email, password } = req.body;
      const checkUserData = await authModel.checkUserData(null, email);

      if (checkUserData.length < 1) {
        return helperWrapper.response(res, 400, `email not registred`, null);
      }

      //checking accountStatus isActive ?
      //disabled while develompent
      // if (checkUserData[0].accountStatus !== "active") {
      //   return helperWrapper.response(
      //     res,
      //     400,
      //     `check your email for account acticvation`,
      //     null
      //   );
      // }

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
      payload.role = "worker";

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
  loginRecruiter: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkRecruiterData = await authModel.checkRecruiterData(email);

      console.log(checkRecruiterData);
      if (checkRecruiterData.length < 1) {
        return helperWrapper.response(res, 400, `email not registred`, null);
      }

      //checking accountStatus isActive ?
      // disable while development
      // if (checkRecruiterData[0].accountStatus !== "active") {
      //   return helperWrapper.response(
      //     res,
      //     400,
      //     `check your email for account acticvation`,
      //     null
      //   );
      // }

      //compare password
      const validPass = await bcrypt.compare(
        password,
        checkRecruiterData[0].password
      );
      if (!validPass) {
        return helperWrapper.response(res, 400, `wrong password`);
      }

      //declare payload
      const payload = checkRecruiterData[0];
      delete payload.password;
      payload.role = "reqcuiter";

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
        id: payload.id,
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
};
