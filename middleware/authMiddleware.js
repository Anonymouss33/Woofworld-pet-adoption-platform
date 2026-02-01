const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const Owner = require('../models/Owner');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables');
}

const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user =
            (await Customer.findById(decoded.id).select('-password')) ||
            (await Owner.findById(decoded.id).select('-password')) ||
            (await Admin.findById(decoded.id).select('-password'));

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        console.log('Authenticated User:', req.user); // Debug log
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        try {
            if (!req.user || !roles.includes(req.user.role)) {
                console.log('Required roles:', roles, 'User role:', req.user.role); // Debug log
                return res.status(403).json({ message: `Access denied for role: ${req.user?.role || 'None'}` });
            }
            next();
        } catch (error) {
            console.error('Authorization error:', error.message);
            res.status(500).json({ message: 'Internal server error during authorization' });
        }
    };
};


module.exports = { protect, authorize };
