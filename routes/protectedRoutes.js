const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Route Example
router.get('/dashboard', authenticateToken, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the protected dashboard!',
    user: req.user, // Contains decoded token details
  });
});

module.exports = router;
