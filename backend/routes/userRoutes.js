const {Router} = require('express');
const router = Router();
const {getUsers, createUsers} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/create', createUsers);

module.exports = router;