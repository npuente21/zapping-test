const {Router} = require('express');
const router = Router();
const {getUsers, createUsers} = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUsers);

module.exports = router;