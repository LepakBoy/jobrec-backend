const connection = require("../../config/mysql");
module.exports = {
  createSkill: (data) =>
    new Promise((resolve, reject) => {
      connection.query(`INSERT INTO skill SET ?`, data, (err, res) => {
        if (!err) {
          const newResult = {
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL: ${err.sqlMessage}`));
        }
      });
    }),
  getSkillById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM skill where id='${id}'`, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(`SQL: ${err.sqlMessage}`));
        }
      });
    }),
  getSkillBySkillName: (username, nama_skill) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM skill where nama_skill = '${nama_skill}' AND username = '${username}'`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(`SQL: ${err.sqlMessage}`));
          }
        }
      );
    }),
  updatedSkill: (id, data) =>
    new Promise((resolve, reject) => {
      connection.query(
        `update skill SET ? where id = '${id}'`,
        data,
        (err, res) => {
          if (!err) {
            const newResult = {
              ...data,
              id,
            };
            resolve(newResult);
          } else {
            reject(new Error(`SQL: ${err.sqlMessage}`));
          }
        }
      );
    }),
  deletedSkill: (id) =>
    new Promise((resolve, reject) => {
      connection.query(`DELETE FROM skill where id = '${id}'`, (err, res) => {
        if (!err) {
          resolve(id);
        } else {
          reject(new Error(`SQL: ${err.sqlMessage}`));
        }
      });
    }),
};
