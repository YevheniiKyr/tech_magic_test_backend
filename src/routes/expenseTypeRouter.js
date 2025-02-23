const router = require('express').Router();
const expenseTypeController = require('../Controllers/expenseTypeController');

router.get('/', expenseTypeController.getAll);
router.post('/', expenseTypeController.create);
router.get('/:id', expenseTypeController.getByID);
router.put('/:id', expenseTypeController.update);
router.delete('/:id', expenseTypeController.deleteOne);
router.delete('/', expenseTypeController.deleteAll);

module.exports = router;
