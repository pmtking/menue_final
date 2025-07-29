"use client";
import Button from "@/components/Button/page";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    toast('data شسیی')
    e.preventDefault();
    console.log("فرم ارسال شد:", formData);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4 sm:px-6 md:px-8 py-6 bg-white/10 rounded-xl shadow-lg rtl font-sans">
      <h2 className="text-2xl font-bold mb-6 text-center">افزودن محصول جدید</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col font-medium">
          نام محصول
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="نام محصول را وارد کنید"
            required
            className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="flex flex-col font-medium">
          قیمت (تومان)
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="قیمت محصول را وارد کنید"
            required
            min="0"
            className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="flex flex-col font-medium">
          توضیحات
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="توضیحاتی درباره محصول"
            rows={4}
            className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          />
        </label>

        <label className="flex flex-col font-medium">
          تصویر محصول
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2"
          />
        </label>

        <Button
          type="submit"
          name="افزودن محصول"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
        />
      </form>
    </div>
  );
};

export default AddProduct;
