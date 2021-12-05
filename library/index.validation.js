const { validationResult, check } = require('express-validator')

/* CHECK VALIDATION /CREATE POST */
const validationCreate = [
  check('itemName').not().isEmpty() // validator
    .withMessage(`Tidak boleh kosong!`) // message
    .trim().escape() // sanitize
]

const validationCobaPost = [
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
]

const validationEdit = [
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
]

const validator = (req, res, next) => {
  const error = validationResult(req)
  if(!error.isEmpty()) {
    return res.status(400).json({message: error.array({onlyFirstError: true})})
  }
  next()
}

module.exports = { validator, validationCreate, validationCobaPost, validationEdit }