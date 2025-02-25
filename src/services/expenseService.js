
const Expense = require('../models/expense');
const DepartmentBudget = require('../models/budget');

class ExpenseService {
    async createExpense(expenseData) {
        const session = await Expense.startSession();
        try {
            session.startTransaction();
            const newExpense = await Expense.create([{
                expenseType: expenseData.expenseType,
                department: expenseData.department,
                employee: expenseData.employee,
                sum: expenseData.sum,
                date: expenseData.date,
            }], {session});

            await DepartmentBudget.findOneAndUpdate(
                { department: expenseData.department },
                { $inc: { spentSum: expenseData.sum } },
                { new: true, runValidators: true, session: session },
            );
            await session.commitTransaction();
            await session.endSession();
            return newExpense[0];
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }

    async deleteExpense(id) {
        const session = await Expense.startSession();
        try {
            session.startTransaction();
            const expense = await Expense.findByIdAndDelete(
                id, {session});
            if (!expense) {
                throw new Error('Expense not found');
            }
            await DepartmentBudget.findOneAndUpdate(
                { department: expense.department },
                { $inc: { spentSum: -expense.sum } },
                { new: true, session },
            );
            await session.commitTransaction();
            await session.endSession();
            return expense;
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }

    async updateExpense(id, expenseData) {
        const oldExpense = await Expense.findById(id);
        if (!oldExpense) {
            throw new Error('Expense not found');
        }
        const session = await Expense.startSession();
        try {
            session.startTransaction();
            const updatedExpense = await Expense.findByIdAndUpdate(
                id,
                expenseData,
                { new: true, runValidators: true, session },
            );
            if (!updatedExpense) {
                throw new Error('Expense wasn\'t updated');
            }

            if (oldExpense.department.toString() !== updatedExpense.department.toString()) {
                // Віднімаємо суму зі старого департаменту
                await DepartmentBudget.findOneAndUpdate(
                    { department: oldExpense.department },
                    { $inc: { spentSum: -oldExpense.sum } },
                    { new: true, runValidators: true, session },
                );

                // Додаємо суму до нового департаменту
                await DepartmentBudget.findOneAndUpdate(
                    { department: updatedExpense.department },
                    { $inc: { spentSum: updatedExpense.sum } },
                    { new: true, runValidators: true, session },
                );
            } else {
                // Якщо департамент не змінився, просто оновлюємо значення spentSum
                await DepartmentBudget.findOneAndUpdate(
                    { department: updatedExpense.department },
                    { $inc: { spentSum: -oldExpense.sum + updatedExpense.sum } },
                    { new: true, runValidators: true, session },
                );
            }
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }

}

module.exports = new ExpenseService();