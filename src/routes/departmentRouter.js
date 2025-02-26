const router = require('express').Router();
const departmentController = require('../Controllers/departmentController');
const { checkAuth } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const { Roles } = require('./roles');
const departmentBudgetsRouter = require('./departmentBudgetsRouter');

router.use('/:id/budgets', departmentBudgetsRouter); // Перенаправляємо запити на бюджет

router.get('/', checkAuth, checkRole([Roles.ADMIN]), departmentController.getAll);
router.post('/', checkAuth, checkRole([Roles.ADMIN]), departmentController.create);
router.get('/:id', checkAuth, checkRole([Roles.ADMIN]), departmentController.getByID);
router.put('/:id', checkAuth, checkRole([Roles.ADMIN]), departmentController.update);
router.delete('/:id', checkAuth, checkRole([Roles.ADMIN]), departmentController.deleteOne);
router.delete('/', checkAuth, checkRole([Roles.ADMIN]), departmentController.deleteAll);

// router.get('/:id/budgets', checkAuth, checkRole([Roles.ADMIN]), departmentController.getBudgetsByDepartmentID)
// router.get('/:id/budgets/:budgetId', checkAuth, checkRole([Roles.ADMIN]), departmentController.getBudgetByID)
// router.put('/:id/budgets/:budgetId', checkAuth, checkRole([Roles.ADMIN]), departmentController.updateBudget)
// router.post('/:id/budgets', checkAuth, checkRole([Roles.ADMIN]), departmentController.createBudget)
// router.delete('/:id/budgets/:budgetId', checkAuth, checkRole([Roles.ADMIN]), departmentController.deleteBudget);
// router.delete('/:id/budgets', checkAuth, checkRole([Roles.ADMIN]), departmentController.deleteBudgetsByDepartmentID);

router.get('/:id/expenses', checkAuth, checkRole([Roles.ADMIN]), departmentController.getExpensesByDepartment)

module.exports = router;
