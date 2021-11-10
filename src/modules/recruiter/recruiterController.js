const recruiterModel = require("./recruiterModel");
const authModel = require("../auth/authModel");
const helperWrapper = require("../../helpers/wrapper");
const deleteFile = require("../../helpers/delete");
const workerModel = require("../worker/workerModel");
const sendMail = require("../../helpers/email");
const bcrypt = require("bcrypt");

module.exports = {
  getPerusahaanById: async (req, res) => {
    try {
      const { id } = req.params;

      const checkId = await recruiterModel.getPerusahaanById(id);

      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data dengan ID ${id} tidak ditemukan`,
          null
        );
      }

      return helperWrapper.response(
        res,
        200,
        `Berhasil mendapatkan data`,
        checkId
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
  updatePerusahaan: async (req, res) => {
    try {
      const id = req.decodeToken.id;
      const checkId = await recruiterModel.getPerusahaanById(id);

      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data dengan ID ${id} tidak ditemukan`,
          null
        );
      }

      const {
        nama_lengkap,
        email,
        nama_perusahaan,
        bidang,
        domisili,
        deskripsi,
        url_ig,
        url_linkedin,
        nohp,
      } = req.body;

      const setData = {
        nama_lengkap,
        email,
        nama_perusahaan,
        bidang,
        domisili,
        deskripsi,
        url_ig,
        url_linkedin,
        nohp,
        updatedAt: new Date(Date.now()),
      };

      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }

      //validasi email dan nohp
      const checkUserData = await authModel.checkUserData(null, email, nohp);
      const checkRecruiterData = await authModel.checkRecruiterData(
        email,
        nohp
      );

      //validation data worker and recrutier
      if (checkRecruiterData.length > 0) {
        if (checkRecruiterData[0].email === email) {
          return helperWrapper.response(
            res,
            400,
            `Email Sudah Terdaftar Di Akun Lain`,
            null
          );
        }
        if (checkRecruiterData[0].nohp === nohp) {
          return helperWrapper.response(
            res,
            400,
            `Nomor Hp Sudah Terdaftar Di Akun Lain`,
            null
          );
        }
      }
      if (checkUserData.length > 0) {
        if (checkUserData[0].email === email) {
          return helperWrapper.response(
            res,
            400,
            `Email Sudah Terdaftar Di Akun Lain`,
            null
          );
        }
        if (checkUserData[0].nohp === nohp) {
          return helperWrapper.response(
            res,
            400,
            `Nomor Hp Sudah Terdaftar Di Akun Lain`,
            null
          );
        }
      }

      const result = await recruiterModel.updatePerusahaan(setData, id);

      return helperWrapper.response(res, 200, `Data berhasil diubah`, result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  updatePassword: async (req, res) => {
    try {
      const id = req.decodeToken.id;
      const { password, confirmPassword } = req.body;
      const getRecruiter = await recruiterModel.getPerusahaanById(id);
      if (password !== confirmPassword) {
        return helperWrapper.response(res, 404, `Password Tidak Sesuai`, null);
      }
      if (password.length < 6) {
        return helperWrapper.response(
          res,
          404,
          `Password Minimal 6 Character`,
          null
        );
      }
      if (getRecruiter.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Recruiter by Id ${id} Not Found`,
          null
        );
      }
      const hash = await bcrypt.hash(password, 10);

      const result = await recruiterModel.updateRecruiterPasswordById(hash, id);
      return helperWrapper.response(res, 200, "Sucess update Password", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message}`,
        null
      );
    }
  },
  updateImagePerusahaan: async (req, res) => {
    try {
      const id = req.decodeToken.id;

      const checkId = await recruiterModel.getPerusahaanById(id);

      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `data by id ${id} not found`,
          null
        );
      }

      const avatar = req.file ? req.file.filename : null;
      const setData = {
        avatar,
        updatedAt: new Date(Date.now()),
      };

      if (checkId[0].avatar && req.file) {
        deleteFile(`public/uploads/recruiter/${checkId[0].avatar}`);
      }

      const result = recruiterModel.updateImagePerusahaan(setData, id);

      return helperWrapper.response(res, 200, `Data berhasil diubah`, result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `bad request ${error.message}`,
        null
      );
    }
  },
  hireWorker: async (req, res) => {
    try {
      const { tujuan, pesan, workerUsername } = req.body;
      if (!tujuan || !pesan || !workerUsername) {
        return helperWrapper.response(
          res,
          400,
          `Field Harus Terisi Semua`,
          null
        );
      }
      const userHire = {
        nama_perusahaan: req.decodeToken.nama_perusahaan,
        nama_lengkap: req.decodeToken.nama_lengkap,
        email: req.decodeToken.email,
        nohp: req.decodeToken.nohp,
      };
      const userTargetHire = await workerModel.getWorkerByUsername(
        workerUsername
      );
      if (userTargetHire.length < 1) {
        return helperWrapper.response(
          res,
          400,
          `Worker Yang mau di hire tidak ditemukan`,
          null
        );
      }
      const setDataEmail = {
        to: userTargetHire[0].email,
        subject: `New ${tujuan} Offer From ${userHire.nama_perusahaan} on Jobrect App`,
        template: "hire",
        data: {
          namePenerima: userTargetHire[0].name,
          emailPengirim: userHire.email,
          nama_lengkap: userHire.nama_lengkap,
          nama_perusahaan: userHire.nama_perusahaan,
          pesan,
          link: `${process.env.APP_URL_FrontEND}`,
        },
        attachment: [],
      };
      await sendMail.hireWorker(setDataEmail);

      return helperWrapper.response(
        res,
        200,
        `Email Berhasil Terkirim`,
        userTargetHire[0].email
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
