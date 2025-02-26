const Department = require('../models/department');
const DepartmentBudget = require('../models/budget');
const Expense = require('../models/expense');

class DepartmentController {

    async create(req, res, next) {
        try {
            const { name, employeeCount } = req.body;
            const newDepartment = await Department.create({ name, employeeCount });
            return res.status(201).json(newDepartment);
        } catch (error) {
            next(error);
        }
    };

    async deleteAll(req, res, next) {
        try {
            await Department.deleteMany({});
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    };

    async deleteOne(req, res, next) {
        try {
            const department = await Department.findByIdAndDelete(req.params.id);
            if (!department) {
                res.status(404).json({ message: 'Department not found' });
            }
            return res.status(200).json(department);
        } catch (error) {
            next(error);
        }
    };

    async update(req, res, next) {
        try {
            const department = await Department.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true },
            );
            if (!department) {
                res.status(404).json({ message: 'Department not found' });
            }
            return res.status(200).json(department);
        } catch (error) {
            next(error);
        }
    };


    async getByID(req, res, next) {
        try {
            const department = await Department.findById(req.params.id);
            if (!department) {
                res.status(404).json({ message: 'Department not found' });
            }
            return res.status(200).json(department);
        } catch (error) {
            next(error);
        }
    };


    async getAll(req, res, next) {
        try {
            const departments = await Department.find();
            return res.status(200).json(departments);
        } catch (error) {
            next(error);
        }
    };

    async getExpensesByDepartment(req, res, next) {
        try {
            const expenses = await Expense.find({ department: req.params.id });
            if (!expenses) {
                res.status(404).json({ message: 'Budget not found' });
            }
            res.status(200).json(expenses);
        } catch (error) {
            next(error);
        }
    };
}

   module.exports = new DepartmentController()