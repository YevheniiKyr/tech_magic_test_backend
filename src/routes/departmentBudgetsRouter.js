const router = require('express').Router({ mergeParams: true }); // mergeParams дозволяє отримати `:id` департаменту
const departmentBudgetController = require('../controllers/departmentBudgetController');
const { checkAuth } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const { Roles } = require('./roles');

router.get('/', checkAuth, checkRole([Roles.ADMIN]), departmentBudgetController.getBudgetsByDepartmentID);
router.post('/', checkAuth, checkRole([Roles.ADMIN]), departmentBudgetController.create);
router.get('/:budgetId', checkAuth, checkRole([Roles.ADMIN]), departmentBudgetController.getBudgetByID);
router.put('/:budgetId', checkAuth, checkRole([Roles.ADMIN]), departmentBudgetController.update);
router.delete('/:budgetId', checkAuth, checkRole([Roles.ADMIN]), departmentBudgetController.delete);
router.delete('/', checkAuth, checkRole([Roles.ADMIN]), departmentBudgetController.deleteBudgetsByDepartmentID);

module.exports = router;
