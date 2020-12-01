const multer = require('multer');
//console.log('ligne2');
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//console.log('ligne8');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //console.log('ligne11');
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    //console.log(extension);
    callback(null, Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');