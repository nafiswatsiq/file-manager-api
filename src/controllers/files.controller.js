const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { getFileDatabase, saveFileDatabase } = require('../utils/database');

/**
 * Get all files
 */
const getAllFiles = async (req, res, next) => {
  try {
    const files = await getFileDatabase();
    res.status(200).json({
      success: true,
      count: files.length,
      data: files
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get file by ID
 */
const getFileById = async (req, res, next) => {
  try {
    const files = await getFileDatabase();
    const file = files.find(file => file.id === req.params.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    res.status(200).json({
      success: true,
      data: file
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Upload file
 */
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const { filename, originalname, mimetype, size, path: filePath } = req.file;
    
    // Create file metadata
    const fileData = {
      id: uuidv4(),
      filename,
      originalname,
      mimetype,
      size,
      path: filePath.replace(/\\/g, '/'), // Normalize path for all OS
      url: `/uploads/${filename}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add file to database
    const files = await getFileDatabase();
    files.push(fileData);
    await saveFileDatabase(files);

    res.status(201).json({
      success: true,
      data: fileData
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update file metadata
 */
const updateFile = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const files = await getFileDatabase();
    
    const fileIndex = files.findIndex(file => file.id === req.params.id);
    
    if (fileIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    // Update file metadata
    files[fileIndex] = {
      ...files[fileIndex],
      ...(name && { originalname: name }),
      ...(description && { description }),
      updatedAt: new Date().toISOString()
    };

    await saveFileDatabase(files);

    res.status(200).json({
      success: true,
      data: files[fileIndex]
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete file
 */
const deleteFile = async (req, res, next) => {
  try {
    const files = await getFileDatabase();
    const fileIndex = files.findIndex(file => file.id === req.params.id);
    
    if (fileIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    const file = files[fileIndex];
    
    // Delete physical file
    const filePath = path.join(__dirname, '../../', file.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove from database
    files.splice(fileIndex, 1);
    await saveFileDatabase(files);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Download file
 */
const downloadFile = async (req, res, next) => {
  try {
    const files = await getFileDatabase();
    const file = files.find(file => file.id === req.params.id);
    
    if (!file) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    const filePath = path.join(__dirname, '../../', file.path);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'File not found on server'
      });
    }

    res.download(filePath, file.originalname);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFiles,
  getFileById,
  uploadFile,
  updateFile,
  deleteFile,
  downloadFile
};