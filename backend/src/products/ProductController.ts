import { Request, Response } from "express";
import Product from "../models/products";
import path from "path";
import fs from "fs";

interface ProductInput {
  name: string;
  price: number;
  description: string;
  category: string;
  imagePath?: string;
}

// 📦 افزودن محصول
export const AddProductController = async (req: Request, res: Response) => {
  try {
    const { name, price, description, category } = req.body;
    const file = (req as Request & { file?: Express.Multer.File }).file;

    if (!name || !price || !description || !category || !file) {
      return res.status(400).json({ message: "همه فیلدها از جمله تصویر الزامی هستند." });
    }

    const imagePath = `/uploads/${file.filename}`;

    const newProduct: ProductInput = {
      name,
      price: Number(price),
      description,
      category,
      imagePath,
    };

    const product = await Product.create(newProduct);

    return res.status(201).json({ message: "✅ محصول با موفقیت ثبت شد.", data: product });
  } catch (error) {
    console.error("❌ خطا در افزودن محصول:", error);
    return res.status(500).json({ message: "خطای سرور در افزودن محصول." });
  }
};

// 📋 نمایش همه محصولات
export const ShowProductsController = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("❌ خطا در دریافت محصولات:", error);
    return res.status(500).json({ success: false, message: "خطای سرور در دریافت محصولات." });
  }
};

// 🗑️ حذف محصول
export const DeleteProductsController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "محصولی با این شناسه یافت نشد." });
    }

    // حذف تصویر از فایل‌سیستم
    if (deletedProduct.imagePath) {
      const imagePath = path.join(__dirname, "..", "public", deletedProduct.imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return res.status(200).json({ message: "✅ محصول با موفقیت حذف شد.", data: deletedProduct });
  } catch (error) {
    console.error("❌ خطا در حذف محصول:", error);
    return res.status(500).json({ message: "خطای سرور در حذف محصول." });
  }
};

// ✏️ بروزرسانی محصول
export const UpdateProductsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = (req as Request & { file?: Express.Multer.File }).file;

  try {
    if (!id || id === "null") {
      return res.status(400).json({ message: "شناسه محصول نامعتبر است." });
    }

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "محصولی با این شناسه یافت نشد." });
    }

    const updatedFields: Partial<ProductInput> = {
      name: req.body.name,
      price: Number(req.body.price),
      description: req.body.description,
      category: req.body.category,
    };

    // حذف تصویر قبلی در صورت آپلود جدید
    if (file) {
      if (existingProduct.imagePath) {
        const oldImagePath = path.join(__dirname, "..", "public", existingProduct.imagePath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedFields.imagePath = `/uploads/${file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ message: "✅ محصول با موفقیت بروزرسانی شد.", data: updatedProduct });
  } catch (error) {
    console.error("❌ خطا در بروزرسانی محصول:", error);
    return res.status(500).json({ message: "خطای سرور در بروزرسانی محصول." });
  }
};

// 🔍 دریافت محصول خاص
export const GetProductController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "محصولی با این شناسه یافت نشد." });
    }

    return res.status(200).json({ message: "✅ محصول با موفقیت یافت شد.", data: product });
  } catch (error) {
    console.error("❌ خطا در دریافت محصول:", error);
    return res.status(500).json({ message: "خطای سرور در دریافت محصول." });
  }
};
