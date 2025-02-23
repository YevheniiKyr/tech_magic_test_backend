const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    expenseType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpenseType',
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sum: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
