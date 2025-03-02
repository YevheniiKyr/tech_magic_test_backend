const User = require('../models/user');
const Expense = require('../models/expense');

class UserController {
    async deleteOne(req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async deleteAll(req, res, next) {
        try {
            await User.deleteMany({});
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true },
            );
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    async getByID(req, res, next) {
        try {
            const user = await User.findById(req.params.id).populate('department expenses');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await User.find().populate('department expenses');
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    async getExpensesByUser(req, res, next) {
        try {
            const expenses = await Expense.find({ employee: req.params.id }).populate('expenseType department employee');
            return res.status(200).json(expenses);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();