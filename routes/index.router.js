const express = require('express');
const router = express.Router();
const entities = require('entities')

const indexController = require('../controllers/index.controller');
const indexModel = require('../models/index.model');
const uploadConfig = require('../config/upload.config');
const rateLimiter = require('../config/rateLimit.config');
const validator = require('../library/index.validation');
const { check } = require('express-validator');

router.get('/', indexController.home);
router.get('/index', indexController.index);
router.get('/detail/:id', indexController.detail);
router.get('/new', indexController.new);
router.post('/create', [ // router POST
  check('itemName').not().isEmpty() // validator
    .withMessage(`Tidak boleh kosong!`) // message
    .trim().escape() // sanitize
], validator.hasError, rateLimiter, indexController.create);
router.get('/edit/:id', [
  check('id').not().isEmpty()
    .withMessage('Tidak boleh kosong!')
    .isInt().toInt()
    .withMessage('ID harus angka!')
    .custom(async (val, {req, location, path}) => {
      const [conn, result] = await indexModel.getId([req.params.id])
      conn.release()
      if(val !== result[0].id) return Promise.reject(`Tidak ditemukan!`)
    })
    .trim().escape()
], validator.hasError, indexController.edit);
router.put('/:id', rateLimiter, uploadConfig.itemPicture, indexController.update);
router.delete('/:id', rateLimiter,indexController.delete);
router.get('/cobaPost', [
    check('password').not().isEmpty().trim().escape()
      .withMessage('Tidak boleh kosong!')
      .isLength({min: 6})
      .withMessage('Tidak boleh kurang dari 6!'),
    check('re_password').not().isEmpty().trim().escape()
      .withMessage('Tidak boleh kosong!')
      .isLength({min: 6})
      .withMessage('Tidak boleh kurang dari 6!')
      .custom((val, {req, location, path}) => {
        if(val !== req.body.password) {
          return Promise.reject('Password tidak sama!')
        }
        return true
      })
  ], validator.hasError, (req, res) => {res.render('cobaPost', {message: entities.decodeHTML5(req.params.password+req.params.re_password)})})

module.exports = router;