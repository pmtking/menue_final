import mongoose, { Schema, model, models, Document } from "mongoose";

// تعریف اینترفیس برای تایپ‌دهی بهتر
export interface ProductDocument extends Document {
  name: string;
  price: string;
  descriptions: string;
  category?: string;
  imagePath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// تعریف schema
const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    descriptions: { type: String, required: true },
    category: { type: String, default: "متفرقه" },
    imagePath: { type: String }, // مسیر عکس آپلودشده یا لینک Cloudinary
  },
  {
    timestamps: true, // این گزینه createdAt و updatedAt را خودکار اضافه می‌کند
  }
);

// جلوگیری از تعریف مجدد مدل هنگام HMR یا توسعه
const Product = models.Product || model<ProductDocument>("Product", ProductSchema);

export default Product;
