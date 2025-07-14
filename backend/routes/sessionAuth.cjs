const express = require('express');
const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.studentId) {
    next(); //  user is logged in
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
  }
};

module.exports = isAuthenticated;
