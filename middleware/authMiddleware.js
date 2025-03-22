const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from request header
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.user = decoded.user; // Attach user data to request object
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid Token' });
    }
};
