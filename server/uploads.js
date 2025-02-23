const multer = require('multer');


const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

// Initialize multer with storage options
const upload = multer({ storage: storage });

module.exports = upload;
