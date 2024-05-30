const multer = require("multer");
// import { errorCode, errorMessage } from "../resources";
const { errorCode, errorMessage } = require("../resources/index");

// Configure multer storage and file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Files will be uploaded to the 'uploads/' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, `file_${crypto.randomUUID()}.jpg`); // Appending timestamp to filename to make it unique
//   },
// });
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Reject a file if it is not an image
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only.png,.jpg and.jpeg format allowed!"));
  }
};

// Initialize multer with the configured storage
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4000000, files: 10 },
}).any(); //4MB

// Middleware function to handle single file upload
// const uploadFile = upload.any();
const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File size too large. Maximum size is 4MB.",
          errorCode: errorCode.LARGE_IMAGE_SIZE,
        });
      }
      if (err.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          message: "Too many files. Maximum number of files is 10.",
          errorCode: errorCode.MAXIMUM_NUMBER_IMAGE_10,
        });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res
        .status(500)
        .json({
          message: "An unknown error occurred during the upload.",
          errorCode: errorCode.INTERNAL_SERVER_ERROR,
        });
    }
    // Everything went fine.
    next();
  });
};

//Error handling

// const uploadFile = upload.array("image", 10);

module.exports = uploadMiddleware;
