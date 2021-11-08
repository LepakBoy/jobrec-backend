const connection = require("../../config/mysql");

module.exports = {
  checkUserData: (username, email, nohp) =>
    new Promise((resolve, reject) => {
      connection.query(
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
  checkRecruiterData: (email, nohp) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM perekrut WHERE  email = '${email}' OR nohp  = '${nohp}'  `,

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
  registerRecruiter: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO perekrut SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
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
  activationRecruiterAccount: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE perekrut SET accountStatus = ? WHERE id = ?",
        [data.status, data.id],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getUserByUsername: (username) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM pekerja WHERE username = "${username}"`,

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
        "UPDATE pekerja SET ? WHERE username = ?",
        [data, username],
        (error, result) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};
