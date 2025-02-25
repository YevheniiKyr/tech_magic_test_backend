const router = require('express').Router();
const departmentController = require('../Controllers/departmentController');

router.get('/', departmentController.getAll);
router.post('/', departmentController.create);
router.get('/:id', departmentController.getByID);
router.put('/:id', departmentController.update);
router.delete('/:id', departmentController.deleteOne);
router.delete('/', departmentController.deleteAll);

router.get('/:id/budgets', departmentController.getBudgetsByDepartmentID)
router.get('/:id/budgets/:budgetId', departmentController.getBudgetByID)
router.put('/:id/budgets/:budgetId', departmentController.updateBudget)
router.post('/:id/budgets', departmentController.createBudget)
router.delete('/:id/budgets/:budgetId', departmentController.deleteBudget);
router.delete('/:id/budgets', departmentController.deleteBudgetsByDepartmentID);

router.get('/:id/expenses', departmentController.getExpensesByDepartment)

module.exports = router;
