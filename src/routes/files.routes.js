const express = require('express');
const { upload } = require('../middleware/multerConfig');
const filesController = require('../controllers/files.controller');
const { validateFileUpload, validateFileId } = require('../middleware/validators');

const router = express.Router();

/**
 * @route GET /api/files
 * @desc Get all files
 */
router.get('/', filesController.getAllFiles);

/**
 * @route GET /api/files/:id
 * @desc Get single file by ID
 */
router.get('/:id', validateFileId, filesController.getFileById);

/**
 * @route POST /api/files
 * @desc Upload a new file
 */
router.post('/', upload.single('file'), validateFileUpload, filesController.uploadFile);

/**
 * @route PUT /api/files/:id
 * @desc Update file metadata
 */
router.put('/:id', validateFileId, filesController.updateFile);

/**
 * @route DELETE /api/files/:id
 * @desc Delete a file
 */
router.delete('/:id', validateFileId, filesController.deleteFile);

/**
 * @route GET /api/files/download/:id
 * @desc Download a file
 */
router.get('/download/:id', validateFileId, filesController.downloadFile);

module.exports = router;