const Expense = require('../models/expense');
const DepartmentBudget = require('../models/budget');
const ExpenseService = require('../services/expenseService');
class ExpenseController {
    async create(req, res, next) {
        try {
            const { expenseType, department, employee, sum, date } = req.body;
            const newExpense = await ExpenseService.createExpense({expenseType, department, employee, sum, date})
            res.status(201).json(newExpense);
        } catch (error) {
            next(error);
        }
    }

    async deleteOne(req, res, next) {
        try {
            if(!req.params.id) return res.status(400).json({ message: "There is no id in request" });
            const expense = await ExpenseService.deleteExpense(req.params.id)
            return res.status(200).json(expense);
        } catch (error) {
            next(error);
        }
    }

    async deleteAll(req, res, next) {
        try {
            await Expense.deleteMany({});
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const updatedExpense = await ExpenseService.updateExpense(req.params.id, req.body)
            return res.status(200).json(updatedExpense);
        } catch (error) {
            next(error);
        }
    }

    async getByID(req, res, next) {
        try {
            const expense = await Expense.findById(req.params.id).populate('expenseType department employee');
            if (!expense) {
                return res.status(404).json({ message: 'Expense not found' });
            }
            return res.status(200).json(expense);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const expenses = await Expense.find().populate('expenseType department employee');
            return res.status(200).json(expenses);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ExpenseController();
