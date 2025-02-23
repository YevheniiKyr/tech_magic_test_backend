const Expense = require('../models/expense');
const DepartmentBudget = require('../models/departmentBudget');

exports.create = async (req, res, next) => {
    try {
        const { expenseType, department, employee, sum, date } = req.body;
        const newExpense = await Expense.create({
            expenseType,
            department,
            employee,
            sum,
            date,
        });

        await DepartmentBudget.findOneAndUpdate(
            { department: department },
            { $inc: { spentSum: sum } },
            { new: true },
        );

        res.status(201).json(newExpense);
    } catch (error) {
        next(error);
    }
};

exports.deleteOne = async (req, res, next) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        await DepartmentBudget.findOneAndUpdate(
            { department: expense.department },
            { $inc: { spentSum: -expense.sum } },
            { new: true },
        );
        return res.status(200).json(expense);
    } catch (error) {
        next(error);
    }
};

// exports.deleteAll = async (req, res, next) => {
//     try {
//         await Expense.deleteMany({});
//         res.status(204).end();
//     } catch (error) {
//         next(error);
//     }
// };

exports.update = async (req, res, next) => {
    try {
        const oldExpense = await Expense.findById(req.params.id);
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        if (oldExpense.department.toString() !== updatedExpense.department.toString()) {
            // Віднімаємо суму зі старого департаменту
            await DepartmentBudget.findOneAndUpdate(
                { department: oldExpense.department },
                { $inc: { spentSum: -oldExpense.sum } },
            );

            // Додаємо суму до нового департаменту
            await DepartmentBudget.findOneAndUpdate(
                { department: updatedExpense.department },
                { $inc: { spentSum: updatedExpense.sum } },
            );
        } else {
            // Якщо департамент не змінився, просто оновлюємо значення spentSum
            await DepartmentBudget.findOneAndUpdate(
                { department: updatedExpense.department },
                { $inc: { spentSum: -oldExpense.sum + updatedExpense.sum } },
            );
        }
        return res.status(200).json(updatedExpense);
    } catch (error) {
        next(error);
    }
};

exports.getByID = async (req, res, next) => {
    try {
        const expense = await Expense.findById(req.params.id).populate('expenseType department employee');
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        return res.status(200).json(expense);
    } catch (error) {
        next(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const expenses = await Expense.find().populate('expenseType department employee');
        return res.status(200).json(expenses);
    } catch (error) {
        next(error);
    }
};

