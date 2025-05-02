const { param, body, validationResult } = require('express-validator');

/**
 * Validate file upload request
 */
const validateFileUpload = [
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }
    next();
  }
];

/**
 * Validate file ID parameter
 */
const validateFileId = [
  param('id').notEmpty().withMessage('File ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateFileUpload,
  validateFileId
};