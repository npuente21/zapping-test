const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Server alive and running');
});

router.use('/user', require('./userRoutes'));


module.exports = router;