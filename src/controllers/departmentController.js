const Department = require('../models/department');
const DepartmentBudget = require('../models/departmentBudget');
const Expense = require('../models/expense');

exports.create = async (req, res, next) => {
    try {
        const { name, employeeCount } = req.body;
        const newDepartment = await Department.create({ name, employeeCount });
        return res.status(201).json(newDepartment);
    } catch (error) {
        next(error);
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        await Department.deleteMany({});
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

exports.deleteOne = async (req, res, next) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        return res.status(200).json(department);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
    );
        return res.status(200).json(department);
    } catch (error) {
        next(error);
    }
};

exports.getByID = async (req, res, next) => {
    try {
        console.log("Get dep by id");
        const department = await Department.findById(req.params.id);
        return res.status(200).json(department);
    } catch (error) {
        next(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const departments = await Department.find();
        return res.status(200).json(departments);
    } catch (error) {
        next(error);
    }
};

exports.createBudget = async (req, res, next) => {
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

exports.deleteBudget = async (req, res, next) => {
    try {
        const deletedBudget = await DepartmentBudget.findByIdAndDelete(req.params.budgetId);
        res.status(200).json(deletedBudget);
    } catch (error) {
        next(error);
    }
};

exports.deleteBudgetsByDepartmentID = async (req, res, next) => {
    try {
        await DepartmentBudget.deleteMany({ department: req.params.id });
        res.status(200).end();
    } catch (error) {
        next(error);
    }
};

exports.getBudgetByID = async (req, res, next) => {
    try {
        const departmentBudget = await DepartmentBudget.findById(req.params.budgetId);
        res.status(200).json(departmentBudget);
    } catch (error) {
        next(error);
    }
};

exports.updateBudget = async (req, res, next) => {
    try {
        const updatedBudget = await DepartmentBudget.findByIdAndUpdate(
            req.params.budgetId,
            req.body,
            { new: true , runValidators: true},
        );
        res.status(201).json(updatedBudget);
    } catch (error) {
        next(error);
    }
};

exports.getBudgetsByDepartmentID = async (req, res, next) => {
    try {
        const budget = await DepartmentBudget.find({ department: req.params.id });
        res.status(200).json(budget);
    } catch (error) {
        next(error);
    }
};

exports.getExpensesByDepartment = async (req, res, next) => {
    try {
        const expenses = await Expense.find({ department: req.params.id });
        res.status(200).json(expenses);
    } catch (error) {
        next(error);
    }
};
