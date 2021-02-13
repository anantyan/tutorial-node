const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index.controller');
const uploadConfig = require('../config/upload.config');
const rateLimiter = require('../config/rateLimit.config');

router.get('/', indexController.home);
router.get('/index', indexController.index);
router.get('/detail/:id', indexController.detail);
router.get('/new', indexController.new);
router.post('/create', rateLimiter, indexController.create);
router.get('/edit/:id', indexController.edit);
router.put('/:id', rateLimiter, uploadConfig.itemPicture, indexController.update);
router.delete('/:id', rateLimiter,indexController.delete);

module.exports = router;