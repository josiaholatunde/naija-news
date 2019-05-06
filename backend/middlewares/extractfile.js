import multer from 'multer';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const mimeType = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (mimeType) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
});

export default multer({storage}).single('image');
