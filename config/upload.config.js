const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/upload'));
  },
  filename: (req, file, cb) => {
    cb(null, `IMG${Date.now()+path.extname(file.originalname)}`)
  }
})

const filter = (req, file, cb) => {
  const typeFile = /jpeg|jpg|png/
  const extname = typeFile.test(
    path.extname(file.originalname).toLowerCase()
  )
  const typeMime = typeFile.test(file.mimetype)
  if(typeMime && extname) {
    cb(null, true)
  } else {
    cb({message: 'File tidak sesuai format!'})
  }
}

const itemPicture = multer({
  storage: storage,
  limits: {
    fileSize: 5242880 // satuan bytes (5mb)
  },
  fileFilter: filter
}).single('itemPicture')


const uploadConfig = (req, res, next) => {
  itemPicture(req, res, (err) => {
    if(err instanceof multer.MulterError) {
      res.status(400)
      res.render('error', {message: err.message, error: {status: 400}});
    } else if(err) {
      res.status(400)
      res.render('error', {message: err.message, error: {status: 400}});
    } else if(req.file != undefined) {
      next();
    }
  });
}

module.exports = uploadConfig;