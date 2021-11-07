const connection = require("../../config/mysql");

module.exports = {
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
  postSkill: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO skill SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getWorkerSkillByUsername: (username) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM skill WHERE username = ?",
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
};
