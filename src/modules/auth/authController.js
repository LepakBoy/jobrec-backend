const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const authModel = require("./authModel");
const recruiterModel = require("../recruiter/recruiterModel");
const workerModel = require("../worker/workerModel");
const bcrypt = require("bcrypt");
const sendMail = require("../../helpers/email");
const helperWrapper = require("../../helpers/wrapper");
const redis = require("../../config/redis");
require("dotenv").config();

module.exports = {
  registerWorker: async (req, res) => {
    try {
      const { username, name, email, password, nohp } = req.body;
      if (
        username == "" ||
        name == "" ||
        email == "" ||
        password == "" ||
        nohp == ""
      ) {
        return helperWrapper.response(res, 404, `Data harus diisi semua`, null);
      }

      // if (password.length < 6) {
      //   return helperWrapper.response(
      //     res,
      //     404,
      //     `Password Kurang dari 6 kata`,
      //     null
      //   );
      // }

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
            `Email Sudah Terdaftar di akun lain`,
            null
          );
        }
        if (checkRecruiterData[0].nohp === nohp) {
          return helperWrapper.response(
            res,
            400,
            `Nomor Telfon Telah Terdaftar di akun lain`,
            null
          );
        }
      }
      if (checkUserData.length > 0) {
        if (checkUserData[0].username === username) {
          return helperWrapper.response(
            res,
            400,
            `Username sudah terdaftar di akun lain`,
            null
          );
        }
        if (checkUserData[0].email === email) {
          return helperWrapper.response(
            res,
            400,
            `Email sudah terdaftar di akun lain`,
            null
          );
        }
        if (checkUserData[0].nohp === nohp) {
          return helperWrapper.response(
            res,
            400,
            `Nomor Telefon Telah Terdafta di akun lain`,
            null
          );
        }
      }

      const token = jwt.sign(
        { data: setData.username },
        process.env.JWT_SECRETE_KEY,
        {
          expiresIn: "30d",
        }
      );
      const setDataEmail = {
        to: email,
        subject: "Confirm Your Email To Jobrect Account",
        template: "register",
        data: {
          name: setData.name,
          email: email,
          link: `${process.env.APP_URL}/auth/activate-account/${token}`,
        },
        attachment: [],
      };

      // disable while development
      await sendMail.verificationAccount(setDataEmail);

      const result = await authModel.register(setData);
      return helperWrapper.response(
        res,
        200,
        `Registrasi Berhasil, Silahkan cek email anda untuk aktifasi`,
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

  registerRecruiter: async (req, res) => {
    try {
      const { name, companyName, bidang, email, password, nohp } = req.body;

      // if (!name || !companyName || !bidang || !email || !password || !nohp) {
      //   return helperWrapper.response(res, 404, `Data harus diisi semua`, null);
      // }

      if (
        name == "" ||
        companyName == "" ||
        bidang == "" ||
        email == "" ||
        password == "" ||
        nohp == ""
      ) {
        return helperWrapper.response(res, 404, `Data harus diisi semua`, null);
      }
      if (password.length < 6) {
        return helperWrapper.response(
          res,
          404,
          `Password Kurang dari 6 kata`,
          null
        );
      }

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
        bidang,
        email,
        password: hash,
        nohp,
      };
      console.log(setData);
      //validation data worker and recrutier
      if (checkRecruiterData.length > 0) {
        if (checkRecruiterData[0].email === email) {
          return helperWrapper.response(
            res,
            400,
            `Email Sudah Terdaftar di akun lain`,
            null
          );
        }
        if (checkRecruiterData[0].nohp === nohp) {
          return helperWrapper.response(
            res,
            400,
            `Nomor Telfon Telah Terdaftar di akun lain`,
            null
          );
        }
      }
      if (checkUserData.length > 0) {
        if (checkUserData[0].email === email) {
          return helperWrapper.response(
            res,
            400,
            `Email sudah terdaftar di akun lain`,
            null
          );
        }
        if (checkUserData[0].nohp === nohp) {
          return helperWrapper.response(
            res,
            400,
            `Nomor Telefon Telah Terdafta di akun lain`,
            null
          );
        }
      }

      const setDataEmail = {
        to: email,
        subject: "Confirm Your Email To Jobrect Account",
        template: "register",
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

      return helperWrapper.response(
        res,
        200,
        `Registrasi Berhasil, Silahkan cek email anda untuk aktifasi`,
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
  accountRecruiterActivation: async (req, res) => {
    try {
      const { id } = req.params;
      const status = "active";
      const setData = {
        id,
        status,
      };

      const result = await authModel.activationRecruiterAccount(setData);

      // return helperWrapper.response(
      //   res,
      //   200,
      //   `Aktifasi akun berhasil, silahkan login`,
      //   result
      // );
      return res.redirect(`${process.env.APP_URL_FrontEND}/login`);
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
      const setData = {
        username: req.decodeToken.data,
        status: "active",
      };
      const result = await authModel.activationAccount(setData);
      // return helperWrapper.response(
      //   res,
      //   200,
      //   `Aktifasi akun berhasil, silahkan login`,
      //   result
      // );
      return res.redirect(`${process.env.APP_URL_FrontEND}/login`);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  loginWorker: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUserData = await authModel.checkUserData(null, email);

      if (checkUserData.length < 1) {
        return helperWrapper.response(res, 400, `Email tidak terdaftar`, null);
      }

      //checking accountStatus isActive ?
      //disabled while develompent
      if (checkUserData[0].accountStatus !== "active") {
        return helperWrapper.response(
          res,
          400,
          `Silahkan cek email Anda terlebih dahulu untuk aktifasi akun`,
          null
        );
      }

      //compare password
      const validPass = await bcrypt.compare(
        password,
        checkUserData[0].password
      );
      if (!validPass) {
        return helperWrapper.response(res, 400, `Password Salah`);
      }

      //declare payload
      const payload = checkUserData[0];
      delete payload.password;
      payload.role = "Worker";

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

      return helperWrapper.response(res, 200, `Berhasil Masuk`, {
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

      if (checkRecruiterData.length < 1) {
        return helperWrapper.response(res, 400, `Email tidak terdaftar`, null);
      }

      //checking accountStatus isActive ?
      // disable while development
      if (checkRecruiterData[0].accountStatus !== "active") {
        return helperWrapper.response(
          res,
          400,
          `Silahkan cek email Anda terlebih dahulu untuk aktifasi akun`,
          null
        );
      }

      //compare password
      const validPass = await bcrypt.compare(
        password,
        checkRecruiterData[0].password
      );
      if (!validPass) {
        return helperWrapper.response(res, 400, `Password Salah`);
      }

      //declare payload
      const payload = checkRecruiterData[0];
      delete payload.password;
      payload.role = "Recruiter";

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

      return helperWrapper.response(res, 200, `Berhasil Masuk`, {
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
      redis.setex(`accessToken:${token}`, 3600 * 24, token);

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
      const { refreshToken } = req.body;
      redis.get(`refreshToken:${refreshToken}`, (error, result) => {
        if (!error && result !== null) {
          return helperWrapper.response(
            res,
            403,
            "Your refresh token cannot be use"
          );
        }
        jwt.verify(
          refreshToken,
          process.env.JWT_SECRETE_KEY,
          (error, result) => {
            if (error) {
              return helperWrapper.response(res, 403, error.message);
            }
            delete result.iat;
            delete result.exp;
            const token = jwt.sign(result, process.env.JWT_SECRETE_KEY, {
              expiresIn: "1h",
            });
            const newRefreshToken = jwt.sign(
              result,
              process.env.JWT_SECRETE_KEY,
              {
                expiresIn: "24h",
              }
            );

            redis.setex(
              `refreshToken:${refreshToken}`,
              3600 * 24,
              refreshToken
            );

            return helperWrapper.response(res, 200, "Success Refresh Token !", {
              id: result.id,
              token,
              refreshToken: newRefreshToken,
            });
          }
        );
      });
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email, tipe } = req.decodeToken;
      let { password, confirmPassword } = req.body;
      console.log(tipe);
      if (password !== confirmPassword) {
        return helperWrapper.response(res, 400, `Password Tidak Sama`, null);
      }
      password = await bcrypt.hash(password, 10);
      await recruiterModel.updateRecruiterPasswordByEmail(password, email);
      await workerModel.updateWorkerPasswordByEmail(password, email);

      return helperWrapper.response(
        res,
        200,
        `Success Change Password To ${email}`,
        email
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
  forgotPasswordProcess: async (req, res) => {
    try {
      const { email, tipe } = req.query;
      let userCheck = await authModel.checkUserData(null, email);
      if (userCheck.length < 1) {
        // console.log(" ===== > AKUN DI WORKER TIDAK ADA");
        userCheck = await authModel.checkRecruiterData(email, null);
        if (userCheck.length < 1) {
          // console.log(" ===== > AKUN DI Recruiter TIDAK ADA");
          return helperWrapper.response(
            res,
            400,
            `Akun Dengan Email : ${email} Tidak Ditemukan`,
            null
          );
        }
      }
      const token = jwt.sign({ email, tipe }, process.env.JWT_SECRETE_KEY, {
        expiresIn: "1h",
      });
      const setDataEmail = {
        to: email,
        subject: "Forgot Password in Jobrect ?",
        template: "forgot",
        data: {
          email: email,
          link: `${process.env.APP_URL_FrontEND}/confirm-password/${token}`,
        },
        attachment: [],
      };

      // disable while development
      await sendMail.forgotPassword(setDataEmail);
      return helperWrapper.response(
        res,
        200,
        `Success Send Email To ${email}`,
        email
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
