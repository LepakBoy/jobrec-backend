const connection = require("../../config/mysql");

module.exports = {
  // Pengalaman
  postWorkerExp: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO pengalaman SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getWorkerExpByUsername: (username) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pengalaman WHERE username = ?",
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
  getWorkerExpById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pengalaman WHERE id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  deletedWorkerExp: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM pengalaman where id = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(id);
          } else {
            reject(new Error(`SQL: ${err.sqlMessage}`));
          }
        }
      );
    }),
  updateWorkerExp: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `UPDATE pengalaman SET ? WHERE id = ? `,
        [data, id],
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
