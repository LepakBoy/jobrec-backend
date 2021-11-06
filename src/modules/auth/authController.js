const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authModel = require("./authModel");
const bcrypt = require("bcrypt");

module.exports = {
  registerPekerja: async (req, res) => {
    try {
      const { username, name, email, type, password, phoneNumber } = req.body;

      const checkEmail = await authModel.checkEmailPekerja(email);
    } catch (error) {
      console.log(error);
    }
  },
};
