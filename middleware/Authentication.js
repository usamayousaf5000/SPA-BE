const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const secret = 'Usama';

exports.authentication = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(404).json({
            message: 'Access Denied'
        });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(500).json({
            message: 'Token is not valid'
        });
    }
};