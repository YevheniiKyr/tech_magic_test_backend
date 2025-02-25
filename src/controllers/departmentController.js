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
            if(!department) {
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
            if(!department) {
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
            if(!department) {
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

    async createBudget(req, res, next) {
        try {
            const { month, year, allocatedSum, spentSum, carriedOverAmount } = req.body;
            const department = req.params.id;
            const newBudget = await DepartmentBudget.create({
                department,
                month,
                year,
                allocatedSum,
                spentSum,
                carriedOverAmount,
            });
            res.status(200).json(newBudget);
        } catch (error) {
            next(error);
        }
    };

    async deleteBudget(req, res, next) {
        try {
            const deletedBudget = await DepartmentBudget.findByIdAndDelete(req.params.budgetId);
            if(!deletedBudget) {
                res.status(404).json({ message: 'Budget not found' });
            }
            res.status(200).json(deletedBudget);
        } catch (error) {
            next(error);
        }
    };

    async deleteBudgetsByDepartmentID(req, res, next) {
        try {
            await DepartmentBudget.deleteMany({ department: req.params.id });
            res.status(200).end();
        } catch (error) {
            next(error);
        }
    };

    async getBudgetByID(req, res, next) {
        try {
            const departmentBudget = await DepartmentBudget.findById(req.params.budgetId);
            if(!departmentBudget) {
                res.status(404).json({ message: 'Budget not found' });
            }
            res.status(200).json(departmentBudget);
        } catch (error) {
            next(error);
        }
    };

    async updateBudget(req, res, next) {
        try {
            const updatedBudget = await DepartmentBudget.findByIdAndUpdate(
                req.params.budgetId,
                req.body,
                { new: true, runValidators: true },
            );
            if(!updatedBudget) {
                res.status(404).json({ message: 'Budget not found' });
            }
            res.status(201).json(updatedBudget);
        } catch (error) {
            next(error);
        }
    };

    async getBudgetsByDepartmentID(req, res, next) {
        try {
            const budget = await DepartmentBudget.find({ department: req.params.id });
            if(!budget) {
                res.status(404).json({ message: 'Budget not found' });
            }
            res.status(200).json(budget);
        } catch (error) {
            console.log(error);
            next(error);
        }
    };

    async getExpensesByDepartment(req, res, next) {
        try {
            const expenses = await Expense.find({ department: req.params.id });
            if(!expenses) {
                res.status(404).json({ message: 'Budget not found' });
            }
            res.status(200).json(expenses);
        } catch (error) {
            next(error);
        }
    };

}

module.exports = new DepartmentController()