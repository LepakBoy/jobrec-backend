const skillModel = require("./skillModel");
const authModel = require("../auth/authModel");
const helperWrapper = require("../../helpers/wrapper");
const redis = require("../../config/redis");
module.exports = {
  getAllSkillByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      const isRegister = await authModel.getUserByUsername(username);
      if (isRegister.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Username Belum Terdaftar`,
          username
        );
      }
      const result = await skillModel.getAllSkillByUsername(username);
      if (result.length < 1) {
        return helperWrapper.response(res, 200, `Skill Tidak Ditemukan`, []);
      }
      redis.setex(`getSkill:${username}`, 3600, JSON.stringify(result));

      return helperWrapper.response(
        res,
        200,
        `Skill Berhasil Didapatkan`,
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
  createSkill: async (req, res) => {
    try {
      const { username, nama_skill } = req.body;
      const isRegister = await authModel.getUserByUsername(username);
      if (isRegister.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Username Belum Terdaftar`,
          username
        );
      }
      const setData = {
        username,
        nama_skill,
      };
      if (!nama_skill) {
        return helperWrapper.response(
          res,
          400,
          `Input Masih Kosong, Mohon isi Skill Anda`,
          null
        );
      }
      const result = await skillModel.createSkill(setData);
      return helperWrapper.response(res, 200, `Created Success`, result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  updatedSkill: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, nama_skill } = req.body;
      const isRegister = await authModel.getUserByUsername(username);
      const isAlredy = await skillModel.getSkillBySkillName(
        username,
        nama_skill
      );
      if (isRegister.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Username Belum Terdaftar`,
          username
        );
      }
      if (isAlredy.length > 0) {
        return helperWrapper.response(res, 400, `Skill Sudah Diinputkan`, null);
      }
      const setData = {
        username,
        nama_skill,
      };
      const result = await skillModel.updatedSkill(id, setData);
      return helperWrapper.response(res, 200, `Update Success`, result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  deletedSkill: async (req, res) => {
    try {
      const { id } = req.params;
      const checkData = await skillModel.getSkillById(id);
      if (checkData.length < 1) {
        return helperWrapper.response(res, 400, `Data Tidak Ditemukan`, null);
      }
      const result = await skillModel.deletedSkill(id);
      return helperWrapper.response(res, 200, `Deleted Success`, result);
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
