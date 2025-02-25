const ExpenseType = require('../models/expenseType');

class ExpenseTypeController {
    async create(req, res, next) {
        try {
            const { name, description, limit } = req.body;
            const newExpenseType = await ExpenseType.create({ name, description, limit });
            return res.status(201).json(newExpenseType);
        } catch (error) {
            next(error);
        }
    }

    async deleteOne(req, res, next) {
        try {
            const expenseType = await ExpenseType.findByIdAndDelete(req.params.id);
            if (!expenseType) {
                return res.status(404).json({ message: 'Expense type not found' });
            }
            return res.status(200).json(expenseType);
        } catch (error) {
            next(error);
        }
    }

    async deleteAll(req, res, next) {
        try {
            await ExpenseType.deleteMany({});
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const updatedExpenseType = await ExpenseType.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedExpenseType) {
                return res.status(404).json({ message: 'Expense type not found' });
            }
            return res.status(200).json(updatedExpenseType);
        } catch (error) {
            next(error);
        }
    }

    async getByID(req, res, next) {
        try {
            const expenseType = await ExpenseType.findById(req.params.id);
            if (!expenseType) {
                return res.status(404).json({ message: 'Expense type not found' });
            }
            return res.status(200).json(expenseType);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const expenseTypes = await ExpenseType.find();
            return res.status(200).json(expenseTypes);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ExpenseTypeController();