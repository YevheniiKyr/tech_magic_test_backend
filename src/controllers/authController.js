const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role, department: user.department },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

exports.register = async (req, res, next) => {
    try {
        const { email, password, role, firstname, lastname, department} = req.body;
        if (!email || !password) {
            return (res.status(400).json("You didn't input password or email  "))
        }
        if (!department) {
            return (res.status(400).json("You didn't input department "))
        }
        const existingUser = await User.findOne({ email:email });
        if (existingUser) return res.status(400).json({ message: 'Користувач вже існує' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, role, firstname, lastname, department });

        const token = generateToken(newUser);
        const userWithoutPassword = { ...newUser._doc };
        delete userWithoutPassword.password;
        res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
//ijoj
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'Невірні облікові дані' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Невірний пароль' });

        const token = generateToken(user);
        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;
        res.json({ userWithoutPassword, token });
    } catch (error) {
        next(error)
    }
};

// Отримання поточного користувача
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

        res.json(user);
    } catch (error) {
        next(error);
    }
};


