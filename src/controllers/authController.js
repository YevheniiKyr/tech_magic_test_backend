const AuthService = require('../services/authService');
require('dotenv').config();

class AuthController {


    async register (req, res, next) {
        try {
            const { email, password, role, firstname, lastname, department } = req.body;
            if (!email || !password || !firstname || !lastname || !department) {
                return res.status(400).json({
                    message: 'You didn\'t input one of these: ' +
                        'password, email, firstname, lastname, department',
                });
            }
           const {user, token} = await AuthService.register({ email, password, role, firstname, lastname, department });
            res.status(201).json({ user, token });
        } catch (error) {
            next(error);
        }
    };

    async login (req, res, next) {
        try {
            const { email, password } = req.body;
            const {user, token} = AuthService.login({email, password})
            res.json({ user, token });
        } catch (error) {
            next(error);
        }
    };

// Отримання поточного користувача
    async getMe (req, res, next) {
        try {
            const user = await AuthService.getMe(req.user.id)
            res.json(user);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AuthController();



