const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const entities = require('entities')

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
router.post('/cobaPost', 
  [
    check('password')
      .not().isEmpty().trim().escape()
      .withMessage('Tidak boleh kosong!')
      .isLength({min: 6})
      .withMessage('Tidak boleh kurang dari 6!'),
    check('re_password')
      .not().isEmpty().trim().escape()
      .withMessage('Tidak boleh kosong!')
      .isLength({min: 6})
      .withMessage('Tidak boleh kurang dari 6!')
      .custom((val, {req, location, path}) => {
        if(val !== req.body.password) {
          return Promise.reject('Password tidak sama!')
        }
        return true
      })
  ],
  (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
      return res.status(422).json({message: error.array()})
    }
    next()
  },
  (req, res) => {
    res.render(
      'cobaPost', 
      {message: entities.decodeHTML5(req.body.password+req.body.re_password)},
      (err, html) => {
        if(err) throw new Error(err)
        res.send(entities.decodeHTML5(html))
      })
  }
)

module.exports = router;