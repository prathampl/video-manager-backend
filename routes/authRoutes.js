const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, otp });
    } else {
      user.otp = otp;
    }
    await user.save();
    res.status(200).json({ message: 'OTP Sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }
    res.status(200).json({ message: 'OTP Verified' });
  } catch (error) {
    res.status(500).json({ error: 'Verification Failed' });
  }
});



// User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in database
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});




module.exports = router;
