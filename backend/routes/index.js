const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Server alive and running');
});

router.use('/user', require('./userRoutes'));
router.use('/public/videos', require('./streamRoute'));


module.exports = router;