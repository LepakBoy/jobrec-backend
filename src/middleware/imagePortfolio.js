const multer = require("multer");
const helperWrapper = require("../helpers/wrapper");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/portofolio");
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/png"
    ) {
      cb(null, false);
      return cb(new Error("Only Image Type: JPEG, JPG, PNG"));
    }
    return cb(null, true);
  },
}).single("image");
const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return helperWrapper.response(res, 401, err.message, null);
    }
    if (err) {
      return helperWrapper.response(res, 401, err.message, null);
    }
    return next();
  });
};

module.exports = uploadFilter;
