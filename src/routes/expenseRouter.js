const router = require('express').Router();

const expenseController = require("../controllers/expenseController");
const { checkAuth } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const { Roles } = require('./roles');

router.get('/', checkAuth, checkRole([Roles.ADMIN]), expenseController.getAll);
router.post('/', checkAuth, checkRole([Roles.ADMIN]), expenseController.create);
router.get('/:id', checkAuth, checkRole([Roles.ADMIN]), expenseController.getByID);
router.put('/:id', checkAuth, checkRole([Roles.ADMIN]), expenseController.update);
router.delete('/:id', checkAuth, checkRole([Roles.ADMIN]), expenseController.deleteOne);
router.delete('/', checkAuth, checkRole([Roles.ADMIN]), expenseController.deleteAll);

module.exports = router;
