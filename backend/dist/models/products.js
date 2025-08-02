"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// تعریف schema
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    descriptions: { type: String, required: true },
    category: { type: String, default: "متفرقه" },
    imagePath: { type: String }, // مسیر عکس آپلودشده یا لینک Cloudinary
}, {
    timestamps: true, // این گزینه createdAt و updatedAt را خودکار اضافه می‌کند
});
// جلوگیری از تعریف مجدد مدل هنگام HMR یا توسعه
const Product = mongoose_1.models.Product || (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
