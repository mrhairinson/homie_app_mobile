const multer = require("multer");

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
const upload = multer({ storage, fileFilter, limits: { fileSize: 4000000 } });

// Middleware function to handle single file upload
const uploadFile = upload.any();
// const uploadFile = upload.array("image", 10);

module.exports = uploadFile;
