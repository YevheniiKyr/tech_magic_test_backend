const router = require('express').Router();
const budgetController = require('../controllers/budgetController');


router.get('/', budgetController.getAll )
module.exports = router