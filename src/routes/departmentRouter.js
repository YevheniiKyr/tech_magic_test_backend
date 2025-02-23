const router = require('express').Router();
const departmentController = require('../Controllers/departmentController');

router.get('/', departmentController.getAll);
router.post('/', departmentController.create);
router.get('/:id', departmentController.getByID);
router.put('/:id', departmentController.update);
router.delete('/:id', departmentController.deleteOne);
router.delete('/', departmentController.deleteAll);

router.get('/:id/budget', departmentController.getBudgetsByDepartmentID)
router.get('/:id/budget', departmentController.getBudgetByID)
router.put('/:id/budget/:budgetId', departmentController.updateBudget)
router.post('/:id/budget', departmentController.createBudget)
router.delete('/:id/budget/:budgetId', departmentController.deleteBudget);
router.delete('/:id/budget', departmentController.deleteBudgetsByDepartmentID);

router.get('/:id/expenses', departmentController.getExpensesByDepartment)

module.exports = router;
