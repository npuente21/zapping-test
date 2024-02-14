const {Router} = require('express');
const router = Router();
const {login, logout} = require('../controllers/authController');

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
