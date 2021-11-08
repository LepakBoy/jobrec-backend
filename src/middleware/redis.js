const redis = require("../config/redis");
const helperWrapper = require("../helpers/wrapper");

module.exports = {
  getSkillByUsername: (req, res, next) => {
    const { username } = req.body;
    redis.get(`getSkill:${username}`, (error, result) => {
      console.log(`getSkill:${username}`);
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);
        return helperWrapper.response(
          res,
          200,
          "Success Get Skill By Username With Redis",
          newResult
        );
      }
      console.log("data tidak ada di dalam redis");
      return next();
    });
  },
  clearSkill: (req, res, next) => {
    redis.keys("getSkill:*", (error, result) => {
      console.log("DIHAPUS");
      if (result.length > 0) {
        result.forEach((item) => {
          redis.del(item);
        });
      }
    });
    return next();
  },
  getPortofolioByUsername: (req, res, next) => {
    const { username } = req.body;
    redis.get(`getPortofolio:${username}`, (error, result) => {
      console.log(`getPortofolio:${username}`);
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);
        return helperWrapper.response(
          res,
          200,
          "Success Get Portofolio By Username With Redis",
          newResult
        );
      }
      console.log("data tidak ada di dalam redis");
      return next();
    });
  },
  clearPortofolio: (req, res, next) => {
    redis.keys("getPortofolio:*", (error, result) => {
      console.log("DIHAPUS");
      if (result.length > 0) {
        result.forEach((item) => {
          redis.del(item);
        });
      }
    });
    return next();
  },
};
