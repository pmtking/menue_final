import { Request, Response } from "express";
import Product from "../models/products";
import path from "path";
import fs from "fs";
interface ProductsType {
  name?: string;
  price?: string;
  descriptions?: string;
  category?: string;
  image?: string; // URL یا مسیر لوکال تصویر
}
// add products
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

// show  products
export const ShowProductsController = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// delte product
export const DeleteProductsController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteProduc = await Product.findByIdAndDelete(id);
    if (!deleteProduc) {
      return res.status(404).json({ messgae: "محصولی یلفت نشد " });
    }
    return res.status(200).json({
      messgae: "محصول با موفقیت  حذف شد ",
      data: deleteProduc,
    });
  } catch (e) {
    console.error("خطا در حذف محصول", e);
    return res.status(500);
  }
};
// update products
export const UpdateProductsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newImage = req.file;
  const updatedFields = {
    name: req.body.name,
    price: Number(req.body.price),
    description: req.body.descriptions, // اصلاح نام فیلد
    category: req.body.category,
  };

  console.log("شناسه محصول دریافتی:", id);

  try {
    // بررسی صحت شناسه
    if (!id || id === "null") {
      return res.status(400).json({ message: "شناسه محصول نامعتبر است." });
    }

    // یافتن محصول موجود
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "محصول یافت نشد." });
    }

    // حذف عکس قبلی در صورت وجود عکس جدید
    if (newImage && existingProduct.imagePath) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "public",
        existingProduct.imagePath
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("عکس قبلی حذف شد:", oldImagePath);
      }
    }

    // افزودن مسیر عکس جدید به داده‌های آپدیت
    if (newImage) {
      updatedFields.imagePath = `/uploads/${newImage.filename}`;
    }
    console.log("اطلاعات دریافتی برای آپدیت:", updatedFields);

    // آپدیت محصول
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "✅ محصول با موفقیت بروزرسانی شد.",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("❌ خطا در بروزرسانی محصول:", error);
    return res.status(500).json({ message: "خطای سرور در بروزرسانی محصول." });
  }
};

export const GetProducController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const findProductById = await Product.findById({ _id: id });
    if (!findProductById) {
      return res.status(404).json({ message: "محصولی وجود ندارد " });
    }
    return res
      .status(200)
      .json({ messgae: "محصول با موفقیت پیدا شد ", data: findProductById });
  } catch (error) {
    console.error("خطایی وجود دارد ", error);
    return res.status(500).json({ message: "خطایی وجود دارد ", error: error });
  }
};

export default AddProductController;
