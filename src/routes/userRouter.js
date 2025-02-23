const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.get('/:id', userController.getByID);
router.put('/:id', userController.update);
router.delete('/:id', userController.deleteOne);
router.delete('/', userController.deleteAll);

router.get('/:id/expenses',userController.getExpensesByUser)

module.exports = router;
