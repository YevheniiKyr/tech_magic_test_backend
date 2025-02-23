const router = require('express').Router();

const expenseController = require("../controllers/expenseController");

router.get('/', expenseController.getAll);
router.post('/', expenseController.create);
router.get('/:id', expenseController.getByID);
router.put('/:id', expenseController.update);
router.delete('/:id', expenseController.deleteOne);
// router.delete('/', expenseController.deleteAll);

module.exports = router;
