const fs = require('fs');
const path = require('path');

/**
 * Create necessary folders for the application
 */
const createFolders = () => {
  const folders = [
    path.join(__dirname, '../../uploads'),
    path.join(__dirname, '../../data')
  ];

  folders.forEach(folder => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      console.log(`Created folder: ${folder}`);
    }
  });
};

module.exports = {
  createFolders
};