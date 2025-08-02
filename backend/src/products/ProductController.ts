import { Request, Response } from "express";
import Product from "../models/products";

interface ProductsType {
  name?: string;
  price?: string;
  descriptions?: string;
  category?: string;
  image?: string; // URL یا مسیر لوکال تصویر
}

const AddProductController = async (req: Request, res: Response) => {
  try {
    const { name, price, descriptions, category } = req.body;
    const multerReq = req as Request & { file?: Express.Multer.File };
    const file = multerReq.file;

    if (!name || !price || !descriptions || !file) {
      return res
        .status(400)
        .json({ message: "همه فیلدها از جمله تصویر الزامی هستند" });
    }

    const imagePath = `/uploads/${file.filename}`; // مسیر عکس

    const product = await Product.create({
      name,
      price,
      descriptions,
      category,
      imagePath, // حتما اینجا مقدار imagePath بفرست
    });

    return res.status(201).json({
      message: "محصول با موفقیت ثبت شد",
      product,
    });
  } catch (error) {
    console.error("خطا در افزودن محصول:", error);
    return res.status(500).json({ message: "خطای سرور" });
  }
};

export default AddProductController;
