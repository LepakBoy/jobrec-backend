const connecton = require("../../config/mysql");

module.exports = {
  checkEmailPekerja: (email) =>
    new Promise((resolve, reject) => {
      connecton.query(
        "SELECT * FROM pekerja WHERE email = ? ",
        email,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};
