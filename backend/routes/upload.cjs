const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Students = require('../models/Students.cjs')

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, req.user.id + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Dummy auth middleware for demo (replace with real auth)
function authMiddleware(req, res, next) {
  // e.g., verify JWT or session here
  req.user = { id: req.session.studentId }; // demo user id
  next();
}

// Upload route
router.post('/upload-profile-image', authMiddleware, upload.single('profileImage'), async(req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  // Construct the URL to serve the image
  const profileImageUrl = `/uploads/${req.file.filename}`;
  try {
    const studentId = req.user.id;
    await Students.findByIdAndUpdate(studentId, { profileImage: profileImageUrl });

    return res.json({ success: true, profileImageUrl });
  } catch (err) {
    console.error("Error saving image to DB", err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});
module.exports = router;
