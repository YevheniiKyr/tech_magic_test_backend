const router = require('express').Router();
const userController = require('../controllers/userController');
const { checkAuth } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const { Roles } = require('./roles');

router.get('/', checkAuth, checkRole([Roles.ADMIN]), userController.getAll);
router.get('/:id', checkAuth, checkRole([Roles.ADMIN]), userController.getByID);
router.put('/:id', checkAuth, checkRole([Roles.ADMIN]), userController.update);
router.delete('/:id', checkAuth, checkRole([Roles.ADMIN]), userController.deleteOne);
router.delete('/', checkAuth, checkRole([Roles.ADMIN]), userController.deleteAll);

router.get('/:id/expenses', checkAuth, checkRole([Roles.ADMIN, Roles.EMPLOYEE]),userController.getExpensesByUser)

module.exports = router;
