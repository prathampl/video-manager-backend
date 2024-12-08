const jwt = require('jsonwebtoken');

// Middleware to Verify JWT Token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']; // Token from request headers

  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify Token
    req.user = verified; // Store user info in request
    next(); // Continue to the next middleware or route
  } catch (error) {
    res.status(403).json({ error: 'Invalid Token' });
  }
}

module.exports = authenticateToken;
