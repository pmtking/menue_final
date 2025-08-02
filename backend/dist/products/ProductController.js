"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../models/products"));
const AddProductController = async (req, res) => {
    try {
        const { name, price, descriptions, category } = req.body;
        const multerReq = req;
        const file = multerReq.file;
        if (!name || !price || !descriptions || !file) {
            return res
                .status(400)
                .json({ message: "همه فیلدها از جمله تصویر الزامی هستند" });
        }
        const imagePath = `/uploads/${file.filename}`; // مسیر عکس
        const product = await products_1.default.create({
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
    }
    catch (error) {
        console.error("خطا در افزودن محصول:", error);
        return res.status(500).json({ message: "خطای سرور" });
    }
};
exports.default = AddProductController;
