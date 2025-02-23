const cron = require('node-cron');
const Department = require('../models/Department');
const DepartmentBudget= require('../models/DepartmentBudget');

const carryOverBudget = async (departmentId) => {
    const now = new Date();
    const lastMonth = now.getMonth() === 0 ? 12 : now.getMonth() - 1;
    const lastBudgetYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    const updatedBudget = await DepartmentBudget.findOneAndUpdate(
        { department: departmentId, month: lastMonth, year: lastBudgetYear },
        {$set: { carriedOverAmount: { $subtract: ["$allocatedSum", "$spentSum"] } }} ,
        {new: true, runValidators: true},
        )

    await DepartmentBudget.findOneAndUpdate(
        { department: departmentId, month: now.getMonth(), year: now.getFullYear() },
        { $inc: {allocatedSum: updatedBudget.carriedOverAmount}},
        {new: true, runValidators: true},
    )
}

// Запуск 1-го числа кожного місяця о 00:05
cron.schedule('5 0 1 * *', async () => {
    console.log('🔄 Перенесення бюджету на новий місяць...');
    const departments = await Department.find();

    for (const department of departments) {
        await carryOverBudget(department._id);
    }

    console.log('✅ Перенесення завершено!');
});

