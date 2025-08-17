import multer from "multer";
import path from "path";

// تنظیمات ذخیره فایل
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads"); // مسیر ذخیره تصاویر
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  },
});

const upload = multer({ storage });

export default upload;
