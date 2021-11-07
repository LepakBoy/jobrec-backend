const connection = require("../../config/mysql");
module.exports = {
  getAllPortofolioByUsername: (username) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM portofolio where username='${username}'`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(`SQL: ${err.sqlMessage}`));
          }
        }
      );
    }),
  getPortofolioById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM portofolio where id='${id}'`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(`SQL: ${err.sqlMessage}`));
          }
        }
      );
    }),
  createPortfolio: (data) =>
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO portofolio SET ?`, data, (err, res) => {
        if (!err) {
          const newResult = {
            id: res.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL: ${err.sqlMessage}`));
        }
      });
    }),
  updatedPortfolio: (id, data) =>
    new Promise((resolve, reject) => {
      connection.query(
        `update portofolio SET ? where id = '${id}'`,
        data,
        (err, res) => {
          if (!err) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL: ${err.sqlMessage}`));
          }
        }
      );
    }),
  deletedPortfolio: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM portofolio where id = '${id}'`,
        (err, res) => {
          if (!err) {
            resolve(id);
          } else {
            reject(new Error(`SQL: ${err.sqlMessage}`));
          }
        }
      );
    }),
};
