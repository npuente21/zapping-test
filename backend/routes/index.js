const {Router} = require('express');
const router = Router();
const verifyToken = require('../middleware/auth');

router.get('/', (req, res) => {
    res.send('Server alive and running');
});

router.use('/user', require('./userRoutes'));
router.use('/public/videos', verifyToken, require('./streamRoutes'));
router.use('/auth', require('./authRoutes'));


module.exports = router;