const connection = require("../../config/mysql");
const connecton = require("../../config/mysql");

module.exports = {
  checkUserData: (username, email, nohp) =>
    new Promise((resolve, reject) => {
      connecton.query(
        `SELECT * FROM pekerja WHERE username = '${username}' OR email = '${email}' OR nohp  = '${nohp}'  `,

        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),

  register: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO pekerja SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            ...data,
          };
          delete newResult.passowrd;
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  activationAccount: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE pekerja SET accountStatus = ? WHERE username = ?",
        [data.status, data.username],
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
