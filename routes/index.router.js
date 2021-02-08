const express = require('express');
const router = express.Router();
const {indexController} = require('../controllers/index.controller.js');
const uploadConfig = require('../configs/upload.config.js');

router.get('/', indexController.home);
router.get('/index', indexController.index);
router.get('/detail/:id', indexController.detail);
router.get('/new', indexController.new);
router.post('/create', indexController.create);
router.get('/edit/:id', indexController.edit);
router.put('/:id', uploadConfig.itemPicture, indexController.update);
router.delete('/:id', indexController.delete);

module.exports.indexRouter = router;