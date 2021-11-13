const portofolioModel = require("./portofolioModel");
const authModel = require("../auth/authModel");
const helperWrapper = require("../../helpers/wrapper");
const deleteFile = require("../../helpers/delete");
const redis = require("../../config/redis");

module.exports = {
  getPortofolioByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      const isRegister = await authModel.getUserByUsername(username);
      if (isRegister.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Username Belum Terdaftar`,
          null
        );
      }
      const result = await portofolioModel.getAllPortofolioByUsername(username);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Portofolio Tidak Ditemukan`,
          null
        );
      }
      redis.setex(`getPortofolio:${username}`, 3600, JSON.stringify(result));
      return helperWrapper.response(
        res,
        200,
        `Portfolio Berhasil Didapatkan`,
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
  createPortfolio: async (req, res) => {
    try {
      const { username, nama_applikasi, link_repository } = req.body;
      if (!username || !nama_applikasi || !link_repository || !req.file) {
        return helperWrapper.response(res, 400, `Harap isi semua input!`, null);
      }
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
        nama_applikasi,
        link_repository,
        image: req.file ? req.file.filename : null,
      };
      const result = await portofolioModel.createPortfolio(setData);
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
  updatedPortofolio: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, nama_applikasi, link_repository } = req.body;
      const isRegister = await authModel.getUserByUsername(username);
      const isAlredy = await portofolioModel.getPortofolioById(id);
      if (isRegister.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Username Belum Terdaftar`,
          null
        );
      }
      if (isAlredy.length < 1) {
        return helperWrapper.response(res, 400, `Data Tidak Ada`, null);
      }
      const setData = {
        username,
        nama_applikasi,
        link_repository,
      };
      Object.keys(setData).forEach((element) => {
        if (!setData[element]) {
          delete setData[element];
        }
      });
      if (req.file && isAlredy[0].image) {
        setData.image = req.file.filename;
        deleteFile(`public/uploads/portofolio/${isAlredy[0].image}`);
      }

      const result = await portofolioModel.updatedPortfolio(id, setData);
      return helperWrapper.response(
        res,
        200,
        `Updated Portofolio Id: ${id} Success`,
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
  deletedPortofolio: async (req, res) => {
    try {
      const { id } = req.params;
      const isAlredy = await portofolioModel.getPortofolioById(id);
      if (isAlredy.length < 1) {
        return helperWrapper.response(
          res,
          200,
          `Data ID: ${id} Tidak Ditemukan`,
          null
        );
      }
      if (isAlredy[0].image) {
        deleteFile(`public/uploads/portofolio/${isAlredy[0].image}`);
      }
      const result = await portofolioModel.deletedPortfolio(id);
      return helperWrapper.response(
        res,
        200,
        `Succes Deleted Portofolio Id: ${id}`,
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
};
