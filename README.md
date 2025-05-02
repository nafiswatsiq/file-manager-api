# File Management API

A robust Express API for uploading and managing files with comprehensive CRUD operations.

## Features

- File upload with validation
- File retrieval and download
- File metadata update
- File deletion
- Error handling and validation
- Clean API response structure

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

### Get all files
```
GET /api/files
```

### Get file by ID
```
GET /api/files/:id
```

### Upload file
```
POST /api/files
```
Send as form-data with a field named 'file' containing the file to upload.

### Update file metadata
```
PUT /api/files/:id
```
Send JSON body with fields to update:
```json
{
  "name": "New file name",
  "description": "File description"
}
```

### Delete file
```
DELETE /api/files/:id
```

### Download file
```
GET /api/files/download/:id
```

## File Structure

```
├── data/                 # JSON database storage
├── src/
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Middleware functions
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── index.js          # Application entry point
├── uploads/              # Uploaded files storage
├── .gitignore
├── package.json
└── README.md
```

## License

MIT