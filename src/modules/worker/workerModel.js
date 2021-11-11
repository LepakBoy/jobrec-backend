const connection = require("../../config/mysql");

module.exports = {
  getAllWorker: (limit, offset, name, sort, sortType) =>
    new Promise((resolve, reject) => {
      const pp = connection.query(
        `SELECT pekerja.username,pekerja.type,pekerja.name,pekerja.avatar,pekerja.domisili, pekerja.jobdesk, pekerja.type FROM skill INNER JOIN pekerja ON skill.username = pekerja.username WHERE skill.nama_skill Like '${name}' AND accountStatus = 'active'
          GROUP BY pekerja.username ORDER BY pekerja.${sort} ${sortType} LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
      console.log(pp.sql);
    }),
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
  countAllWorker: (name) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) As total FROM skill INNER JOIN pekerja ON skill.username = pekerja.username WHERE skill.nama_skill Like '${name}' AND accountStatus = 'active' GROUP BY pekerja.username`,
        (err, res) => {
          if (!err) {
            // console.log(res.length);
            resolve(res.length > 0 ? res.length : 0);
          } else {
            reject(new Error(`SQL : ${err.sqlMessage}`));
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
