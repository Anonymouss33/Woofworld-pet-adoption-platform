const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDirectory = path.join(__dirname, '../uploads/pets');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer configuration for storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory); // Set upload directory
    },
    filename: (req, file, cb) => {
        // Sanitize filename to prevent special character issues
        const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
        cb(null, `${Date.now()}-${sanitizedFilename}`);
    },
});


// Improved File Filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!file.mimetype) {
        return cb(new Error('Unable to determine file MIME type'), false);
    }

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Only JPEG, PNG, and JPG images are allowed. Received ${file.mimetype}.`), false);
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
});

module.exports = upload;
