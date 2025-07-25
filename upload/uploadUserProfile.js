const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const dir = path.join(__dirname, "../public/uploads/images");
    try {
      await fs.mkdir(dir, { recursive: true }); // create folder if not exists
      cb(null, dir);
    } catch (err) {
      cb(err, dir);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
