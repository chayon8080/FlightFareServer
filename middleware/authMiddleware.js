const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = await User.findById(decoded.id); 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden, Admins only" });
    }
    next();
};

module.exports = { authenticate, authorizeAdmin };
