const express = require('express')
const router = express.Router()
const entities = require('entities')

const indexController = require('../controllers/index.controller')
const indexModel = require('../models/index.model')
const uploadConfig = require('../config/upload.config')
const { rateLimitWrite, rateLimitRead } = require('../config/rateLimit.config')
const { validator, validationCreate, validationEdit, validationCobaPost } = require('../library/index.validation')

router.get('/', rateLimitRead, indexController.home)
router.get('/index', rateLimitRead, indexController.index)
router.get('/login/:id', rateLimitRead, indexController.detail)
router.get('/new', rateLimitRead, indexController.new)
router.post('/create', rateLimitRead, validationCreate, validator, rateLimitWrite, indexController.create)
router.get('/edit/:id', validationEdit, validator, rateLimitRead,indexController.edit)
router.put('/:id', rateLimitWrite, uploadConfig, indexController.update)
router.delete('/:id', rateLimitWrite, indexController.delete)
router.get('/cobaPost', validationCobaPost, validator, rateLimitRead,
  (req, res) => {
    res.render('cobaPost', {
      message: entities.decodeHTML5(req.params.password+req.params.re_password)
    })
  })

module.exports = router