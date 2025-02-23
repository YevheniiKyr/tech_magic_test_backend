const router = require('express').Router()
const authController = require("../controllers/authController");
const { protect } = require('../middlewares/authMiddleware');


router.post('/login',  authController.login)
router.post('/register', authController.register)
router.get('/me', protect, authController.getMe )


module.exports = router