const connection = require("../../config/mysql");

module.exports = {
  getPerusahaanById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM perekrut WHERE id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : (${error.sqlMessage})`));
          }
        }
      );
    }),
  updatePerusahaan: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE perekrut SET ? WHERE id = ?",
        [data, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL : (${error.sqlMessage})`));
          }
        }
      );
    }),
};
