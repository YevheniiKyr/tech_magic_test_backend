const router = require('express').Router();

const userRouter = require('./userRouter');
const departmentRouter = require('./departmentRouter');
const expenseTypeRouter = require('./expenseTypeRouter');
const expenseRouter = require('./expenseRouter');
const authRouter = require('./authRouter');


router.use('/users', userRouter);
router.use('/departments', departmentRouter);
router.use('/expense-types', expenseTypeRouter);
router.use('/expenses', expenseRouter);
router.use('/auth', authRouter);

module.exports = router;
