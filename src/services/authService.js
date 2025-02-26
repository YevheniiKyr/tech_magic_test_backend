
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {

    generateToken = (user) => {
        return jwt.sign(
            { id: user._id, email: user.email, role: user.role, department: user.department },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        );
    };

    async register(user) {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await User.create({
            email: user.email,
            password: hashedPassword,
            role: user.role,
            firstname: user.firstname,
            lastname: user.lastname,
            department: user.department,
        });

        const token = this.generateToken(newUser);
        const userWithoutPassword = { ...newUser._doc };
        delete userWithoutPassword.password;
        return {userWithoutPassword, token};
    }

    async login(loginUser) {

        const user = await User.findOne({ email: loginUser.email });
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(loginUser.password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = this.generateToken(user);
        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;
        return {userWithoutPassword, token}
    }

    async getMe(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) throw new Error('User has not been found');
    }
}

module.exports = new AuthService();

