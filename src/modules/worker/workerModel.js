const connection = require("../../config/mysql");

module.exports = {
  // Data Worker(Pekerja)
  getWorkerByUsername: (username) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pekerja WHERE username = ?",
        username,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updatePersonalData: (data, username) =>
    new Promise((resolve, reject) => {
      connection.query(
        `UPDATE pekerja SET ? WHERE username = ? `,
        [data, username],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updateAvatar: (data, username) =>
    new Promise((resolve, reject) => {
      connection.query(
        `UPDATE pekerja SET ? WHERE username = ? `,
        [data, username],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updatePasswordWorker: (data, username) =>
    new Promise((resolve, reject) => {
      connection.query(
        `UPDATE pekerja SET password = ?, updatedAt = ? WHERE username = ? `,
        [data.password, data.updatedAt, username],
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
