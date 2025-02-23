const mongoose = require('mongoose');

const ExpenseTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    limit: { type: Number, required: true }, // Гранична сума
});

module.exports = mongoose.models.ExpenseType || mongoose.model('ExpenseType', ExpenseTypeSchema);
