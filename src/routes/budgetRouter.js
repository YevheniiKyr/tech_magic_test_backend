const router = require('express').Router();
const budgetController = require('../controllers/budgetController');
const { checkAuth } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const { Roles } = require('./roles');


router.get('/', checkAuth, checkRole([Roles.ADMIN]), budgetController.getAll )
module.exports = router