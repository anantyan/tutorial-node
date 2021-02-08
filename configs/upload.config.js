const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/upload'));
  },
  filename: (req, file, cb) => {
    cb(null, `IMG${Date.now()+path.extname(file.originalname)}`);
  }
});

const filter = (req, file, cb) => {
  const typeFile = /jpeg|jpg|png/;
  const extname = typeFile.test(
    path.extname(file.originalname).toLowerCase()
  );
  const typeMime = typeFile.test(file.mimetype);
  if(typeMime && extname) {
    cb(null, true);
  } else {
    cb({message: 'File tidak sesuai format!'});
  }
};

const itemPicture = multer({
  storage: storage,
  limits: {
    fileSize: 5242880
  }, // satuan bytes (5mb)
  fileFilter: filter
}).single('itemPicture');

class uploadConfig {
  
  static itemPicture(req, res, next) {
    itemPicture(req, res, (err) => {
      if(err instanceof multer.MulterError) {
        res.status(200);
        res.send({status_code: 200, message: err.message});
      } else if(err) {
        res.status(200);
        res.send({status_code: 200, message: err.message});
      } else if(req.file != undefined) {
        next();
      }
    });
  }
}

module.exports = uploadConfig;