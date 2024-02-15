const {Router} = require('express');
const router = Router();
const {streamController} = require('../controllers/streamController');

router.get('/segment.m3u8', streamController);

module.exports = router;