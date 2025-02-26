const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.checkAuth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Немає токена, авторизація заборонена' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Недійсний токен' });
    }
};
