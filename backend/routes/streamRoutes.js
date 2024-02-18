const {Router} = require('express');
const router = Router();
const {streamController, getStreamData} = require('../controllers/streamController');

router.get('/segment.m3u8', streamController);
router.get('/:id', getStreamData);

module.exports = router;