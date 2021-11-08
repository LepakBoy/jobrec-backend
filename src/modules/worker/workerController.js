const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const helperWrapper = require("../../helpers/wrapper");
const workerModel = require("./workerModel");
const sendMail = require("../../helpers/email");
const bcrypt = require("bcrypt");
const deleteFile = require("../../helpers/delete");

module.exports = {
  // Worker personal
  getWorkerByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      const result = await workerModel.getWorkerByUsername(username);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Worker by username ${username} Not FOund`,
          null
        );
      } else {
        return helperWrapper.response(
          res,
          200,
          "Sukses get worker by Username",
          result
        );
      }
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
  updatePersonalData: async (req, res) => {
    try {
      const { username } = req.params;
      const checkUsername = await workerModel.getWorkerByUsername(username);
      if (checkUsername.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Worker by Id ${Username} Not FOund`,
          null
        );
      }
      const {
        jobdesk,
        domisili,
        url_ig,
        url_gitlab,
        url_github,
        deskripsi,
        avatar,
      } = req.body;
      const setData = {
        jobdesk,
        domisili,
        url_ig,
        url_gitlab,
        url_github,
        deskripsi,
        avatar: req.file ? req.file.filename : null,
        updatedAt: new Date(Date.now()),
      };
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }
      if (req.file && checkUsername[0].avatar) {
        deleteFile(`public/uploads/avatar/${checkUsername[0].avatar}`);
      }
      const result = await workerModel.updatePersonalData(setData, username);
      return helperWrapper.response(res, 200, "Sucess update data", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
  updatePasswordWorker: async (req, res) => {
    try {
      const { username } = req.params;
      const checkUsername = await workerModel.getWorkerByUsername(username);
      if (checkUsername.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by Id ${username} Not FOund`,
          null
        );
      }
      console.log(checkUsername);
      const { password, confirm_password } = req.body;
      // Perbandingan Password lama dengan database
      // const isValidPassword = await bcrypt.compare(
      //   old_password,
      //   checkUsername[0].password
      // );
      // if (!isValidPassword) {
      //   return helperWrapper.response(res, 400, `Password tidak sama`, null);
      // }

      if (password !== confirm_password) {
      }
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
