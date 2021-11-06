const skillModel = require("./skillModel");
const authModel = require("../auth/authModel");
const helperWrapper = require("../../helper/");

module.exports = {
  getAllSkillByUserId: async (req, res) => {
    try {
    } catch (error) {}
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
          null
        );
      }
      const setData = {
        username,
        nama_skill,
      };
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
          null
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
