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
      const username = req.decodeToken.username;
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
        type,
      } = req.body;
      const setData = {
        jobdesk,
        domisili,
        url_ig,
        url_gitlab,
        url_github,
        deskripsi,
        type,
        updatedAt: new Date(Date.now()),
      };
      console.log(setData);
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
  updateAvatar: async (req, res) => {
    try {
      const username = req.decodeToken.username;
      const checkUsername = await workerModel.getWorkerByUsername(username);
      if (checkUsername.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Worker by Id ${Username} Not FOund`,
          null
        );
      }
      const { avatar } = req.body;
      const setData = {
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
      const result = await workerModel.updateAvatar(setData, username);
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
      return helperWrapper.response(
        res,
        200,
        "Success create Personal data",
        result
      );
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
      const username = req.decodeToken.username;
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
      console.log(password);
      if (password !== confirmPassword || password.length < 6) {
        return helperWrapper.response(
          res,
          404,
          `Password Tidak Sama, Dan Minimal 6 Huruf`,
          null
        );
      }
      console.log(password);
      const passwordEnkrip = await bcrypt.hash(password, 10);
      const setData = {
        password: passwordEnkrip,
        updatedAt: new Date(Date.now()),
      };
      console.log(setData.password);
      const result = await workerModel.updatePasswordWorker(setData, username);
      return helperWrapper.response(
        res,
        200,
        "Success Update Password user",
        result
      );
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
