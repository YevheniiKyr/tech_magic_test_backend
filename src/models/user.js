const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['employee', 'admin'],
            default: 'employee',
            required: true
        },
        department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
        expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
    },
    { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
