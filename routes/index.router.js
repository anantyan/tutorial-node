const express = require('express')
const router = express.Router()
const entities = require('entities')

const IndexController = require('../controllers/index.controller')
const uploadConfig = require('../config/upload.config')
const { rateLimitWrite, rateLimitRead } = require('../config/rateLimit.config')
const { IndexValidation, validationCreate, validationEdit, validationCobaPost } = require('../library/index.validation')

router.get('/', rateLimitRead, IndexController.home)
router.get('/index', rateLimitRead, IndexController.index)
router.get('/login/:id', rateLimitRead, IndexController.detail)
router.get('/new', rateLimitRead, IndexController.new)
router.post('/create', rateLimitRead, rateLimitWrite, validationCreate, IndexValidation, IndexController.create)
router.get('/edit/:id', rateLimitRead, validationEdit, IndexValidation, IndexController.edit)
router.put('/:id', rateLimitWrite, uploadConfig, IndexController.update)
router.delete('/:id', rateLimitWrite, IndexController.delete)
router.get('/cobaPost', rateLimitRead, validationCobaPost, IndexValidation,
  (req, res) => {
    res.render('cobaPost', {
      message: entities.decodeHTML5(req.query.password+req.query.re_password)
    })
  })

module.exports = router