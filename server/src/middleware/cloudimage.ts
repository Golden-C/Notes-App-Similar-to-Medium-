import multer from 'multer'
import path from 'path';
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET_KEY!,
});
export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, callback: any) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf' && ext !== '.docx' && ext !== '.doc' && ext !== '.zip') {
      callback(new Error('File type is not supported.'), false);
      return;
    }
    callback(null, true);
  }
}).single('avatar');