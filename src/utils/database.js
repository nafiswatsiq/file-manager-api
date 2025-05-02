const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Convert callback-based fs functions to promise-based
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Path to the JSON database file
const dbPath = path.join(__dirname, '../../data/files.json');

/**
 * Get all files from the database
 */
const getFileDatabase = async () => {
  try {
    // Check if the file exists
    if (!fs.existsSync(dbPath)) {
      // Create empty database if it doesn't exist
      await saveFileDatabase([]);
      return [];
    }

    // Read and parse the database file
    const data = await readFileAsync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file database:', error);
    return [];
  }
};

/**
 * Save files to the database
 */
const saveFileDatabase = async (files) => {
  try {
    // Ensure directory exists
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write data to file
    await writeFileAsync(dbPath, JSON.stringify(files, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to file database:', error);
    throw new Error('Could not save to database');
  }
};

module.exports = {
  getFileDatabase,
  saveFileDatabase
};