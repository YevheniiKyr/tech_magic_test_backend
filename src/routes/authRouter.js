const router = require('express').Router()
const authController = require("../controllers/authController");
const { checkAuth } = require('../middlewares/authMiddleware');


router.post('/login',  authController.login)
router.post('/register', authController.register)
router.get('/me', checkAuth, authController.getMe )


module.exports = router