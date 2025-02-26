const router = require('express').Router();
const expenseTypeController = require('../Controllers/expenseTypeController');
const { checkAuth } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const { Roles } = require('./roles');

router.get('/', checkAuth, checkRole([Roles.EMPLOYEE,Roles.ADMIN]), expenseTypeController.getAll);
router.post('/', checkAuth, checkRole([Roles.ADMIN]), expenseTypeController.create);
router.get('/:id', checkAuth, checkRole([Roles.EMPLOYEE, Roles.ADMIN]), expenseTypeController.getByID);
router.put('/:id', checkAuth, checkRole([Roles.ADMIN]), expenseTypeController.update);
router.delete('/:id', checkAuth, checkRole([Roles.ADMIN]), expenseTypeController.deleteOne);
router.delete('/', checkAuth, checkRole([Roles.ADMIN]), expenseTypeController.deleteAll);

module.exports = router;
