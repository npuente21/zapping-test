const {Router} = require('express');
const router = Router();
const verifyToken = require('../middleware/auth');
const {getUsers, createUsers, getProfile} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUsers);
router.get('/profile', verifyToken, getProfile);

module.exports = router;