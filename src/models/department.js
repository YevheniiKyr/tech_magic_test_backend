const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    employeeCount: { type: Number, default: 0 },
    employees: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}], default: [],
    },
});

module.exports = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
