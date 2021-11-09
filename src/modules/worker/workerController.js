const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const helperWrapper = require("../../helpers/wrapper");
const workerModel = require("./workerModel");
const sendMail = require("../../helpers/email");

const deleteFile = require("../../helpers/delete");

module.exports = {
  // Worker personal
  getAllWorker: async (req, res) => {
    try {
      let { page, limit, skillName, sort, sortType } = req.query;
      skillName = skillName == null ? `%` : `%${skillName}%`;
      page = typeof page == "number" ? page : 1;
      limit = 5;
      sortType = sortType || "DESC";
      sort = sort || "createdAt";
      const offset = page * limit - limit;
      const totalData = await workerModel.countAllWorker(skillName);
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData: totalData || 0,
      };
      const result = await workerModel.getAllWorker(
        limit,
        offset,
        skillName,
        sort == "skill" ? "createdAt" : sort,
        sortType
      );
      let resultData = [];
      result.map((e) => {
        let skill = workerModel
          .getWorkerSkillByUsername(e.username)
          .then((res) => {
            let listSkill = [];
            res.map((el) => {
              listSkill.push(el.nama_skill);
              jumlahSkill = el.total;
            });
            let mapData = { ...e, skill: listSkill };
            resultData.push(mapData);
          });
      });
      setTimeout(() => {
        if (sort == "skill") {
          resultData.sort(function (a, b) {
            return b.skill.length - a.skill.length;
          });
        }
        return helperWrapper.response(
          res,
          200,
          "success Get Data",
          resultData,
          pageInfo
        );
      }, 100);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
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
  getWorkerExpById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await workerModel.getWorkerExpById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Worker Experience by Id ${id} Not FOund`,
          null
        );
      } else {
        return helperWrapper.response(
          res,
          200,
          "Sukses get worker Experience by Id",
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
  deletedWorkerExp: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await workerModel.getWorkerExpById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          200,
          `Pengalaman id: ${id} Tidak Ditemukan`,
          null
        );
      }
      const result = await workerModel.deletedWorkerExp(id);
      return helperWrapper.response(
        res,
        200,
        `Succes Deleted Pengalaman Username: ${id}`,
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad Request : ${error.message}`,
        null
      );
    }
  },
  updateWorkerExp: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await workerModel.getWorkerExpById;
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Worker by Id ${id} Not FOund`,
          null
        );
      }
      const { nama_perusahaan, posisi, tgl_masuk, tgl_keluar, deskripsi } =
        req.body;
      const setData = {
        nama_perusahaan,
        posisi,
        tgl_masuk,
        tgl_keluar,
        deskripsi,
        updatedAt: new Date(Date.now()),
      };
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }
      const result = await workerModel.updateWorkerExp(id);
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
};
