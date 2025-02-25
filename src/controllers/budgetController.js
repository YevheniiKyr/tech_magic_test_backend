const Budget = require('../models/budget');

class BudgetController {
    async getAll(req, res, next) {
        try {
            const budgets = await Budget.find().populate('department');
            res.status(200).json(budgets);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new BudgetController();
