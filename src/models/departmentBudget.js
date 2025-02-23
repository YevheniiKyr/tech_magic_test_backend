const mongoose = require('mongoose');

const DepartmentBudgetSchema = new mongoose.Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    month: { type: Number, required: true,   min: [1, "Month must be at least 1"], max: [12, "Month cannot be greater than 12"]},
    year: { type: Number, required: true },
    allocatedSum: { type: Number, required: true }, // Виділена сума
    spentSum: { type: Number, default: 0 }, // Витрачена сума
    carriedOverAmount: { type: Number, default: 0 }, // Перенесений залишок
});

module.exports = mongoose.models.DepartmentBudget || mongoose.model('DepartmentBudget', DepartmentBudgetSchema);
