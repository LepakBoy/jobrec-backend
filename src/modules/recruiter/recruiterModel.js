const connection = require("../../config/mysql");

module.exports = {
  updateWorkerPasswordByEmail: (password, email) =>
    new Promise((resolve, reject) => {
      connection.query(
        `UPDATE pekerja SET password ='${password}' WHERE email = '${email}' `,
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
