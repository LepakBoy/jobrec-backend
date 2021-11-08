const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const helperWrapper = require("../../helpers/wrapper");
const workerModel = require("./workerModel");
const sendMail = require("../../helpers/email");

module.exports = {
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
      const checkId = await workerModel.getWorkerByUsername(username);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Worker by Id ${Username} Not FOund`,
          null
        );
      }
      const { jobdesk, domisili, url_ig, url_gitlab, url_github, deskripsi } =
        req.body;
      const setData = {
        jobdesk,
        domisili,
        url_ig,
        url_gitlab,
        url_github,
        deskripsi,
        updatedAt: new Date(Date.now()),
      };
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
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
  // Skill
  postSkill: async (req, res) => {
    try {
      const { username, nama_skill } = req.body;
      const setData = {
        username,
        nama_skill,
      };
      const result = await workerModel.postSkill(setData);
      return helperWrapper.response(res, 400, "Success create skill", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
  updateSkill: async (req, res) => {
    try {
      const { username } = req.params;
      const checkId = await workerModel.getWorkerSkillByUsername(username);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Worker by Id ${Username} Not FOund`,
          null
        );
      }
      const { nama_skill } = req.body;
      const setData = {
        nama_skill,
        updatedAt: new Date(Date.now()),
      };
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
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
  // Pengalaman Kerja
  postWorkerExp: async (req, res) => {
    try {
      const {
        username,
        nama_perusahaan,
        posisi,
        tgl_masuk,
        tgl_keluar,
        deskripsi,
      } = req.body;
      const setData = {
        username,
        nama_perusahaan,
        posisi,
        tgl_masuk,
        tgl_keluar,
        deskripsi,
      };
      const result = await workerModel.postWorkerExp(setData);
      return helperWrapper.response(res, 200, "Success create skill", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
  getWorkerExpByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      const result = await workerModel.getWorkerExpByUsername(username);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Worker Experience by username ${username} Not FOund`,
          null
        );
      } else {
        return helperWrapper.response(
          res,
          200,
          "Sukses get worker Experience by Username",
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
};
