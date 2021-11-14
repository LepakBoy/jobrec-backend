const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const helperWrapper = require("../../helpers/wrapper");
const pengalamanModel = require("./pengalamanModel");
const authModel = require("../auth/authModel");
const redis = require("../../config/redis");

module.exports = {
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

      if (!nama_perusahaan || !tgl_masuk || !tgl_keluar || !deskripsi) {
        return helperWrapper.response(
          res,
          400,
          `Input Masih Kosong, Mohon isi Semua Inputan `,
          null
        );
      }

      const setData = {
        username,
        nama_perusahaan,
        posisi,
        tgl_masuk,
        tgl_keluar,
        deskripsi,
      };
      const result = await pengalamanModel.postWorkerExp(setData);
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
      const username = req.decodeToken.username;
      const isRegister = await authModel.getUserByUsername(username);
      if (isRegister.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Username Belum Terdaftar`,
          null
        );
      }
      const result = await pengalamanModel.getWorkerExpByUsername(username);
      redis.setex(`getPengalaman:${username}`, 3600, JSON.stringify(result));

      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Pengalaman Tidak ditemukan`,
          null
        );
      } else {
        return helperWrapper.response(
          res,
          200,
          "Sukses dapat pengalaman",
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
      const result = await pengalamanModel.getWorkerExpById(id);
      redis.setex(`getPengalaman:${id}`, 3600, JSON.stringify(result));
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          204,
          `Worker Experience by Id ${id} Not FOund`
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
      const checkId = await pengalamanModel.getWorkerExpById(id);
      console.log(checkId);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Pengalaman id: ${id} Tidak Ditemukan`,
          null
        );
      }
      const result = await pengalamanModel.deletedWorkerExp(id);
      return helperWrapper.response(
        res,
        200,
        `Succes Deleted Pengalaman Id: ${id}`,
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
      const { nama_perusahaan, posisi, tgl_masuk, tgl_keluar, deskripsi } =
        req.body;
      if (
        nama_perusahaan == "" ||
        posisi == "" ||
        tgl_masuk == "" ||
        tgl_keluar == "" ||
        deskripsi == ""
      ) {
        return helperWrapper.response(
          res,
          400,
          `Input Masih Kosong, Mohon isi Semua Inputan `,
          null
        );
      }

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
      const result = await pengalamanModel.updateWorkerExp(setData, id);
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
