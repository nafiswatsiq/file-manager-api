const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create unique filename: uuid + original extension
    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    cb(null, fileName);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept all file types for now - implement restrictions as needed
  cb(null, true);
  
  // Example of file type restriction:
  // const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  // if (allowedTypes.includes(file.mimetype)) {
  //   cb(null, true);
  // } else {
  //   cb(new Error('Invalid file type. Only JPEG, PNG and PDF are allowed.'), false);
  // }
};

// File size limits
const limits = {
  fileSize: 10 * 1024 * 1024 // 10 MB
};

// Initialize multer
const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = { upload };