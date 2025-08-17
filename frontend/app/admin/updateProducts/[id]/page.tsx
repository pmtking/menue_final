"use client";
import Button from "@/components/Button/page";
import api from "@/libs/axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateproductsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const productId = params?.id;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("description", formData.description);
    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      const res = await api.put(`/api/product/update/${productId}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ محصول با موفقیت ویرایش شد");
      setSuccess(true);
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "❌ خطایی در ویرایش محصول رخ داد";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const findData = async () => {
    if (!productId) return toast.error("شناسه محصول یافت نشد");

    try {
      const { data } = await api.get(`/api/product/get/${productId}`);
      if (!data?.data) return toast.error("محصولی یافت نشد");

      setFormData({
        name: data.data.name || "",
        price: data.data.price?.toString() || "",
        description: data.data.description || "",
        image: null,
      });
    } catch {
      toast.error("خطا در دریافت اطلاعات محصول");
    }
  };

  useEffect(() => {
    findData();
  }, [productId]);

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4 py-6 bg-white/10 rounded-xl shadow-lg rtl font-sans">
      <h2 className="text-2xl font-bold mb-6 text-center">ویرایش محصول</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col font-medium">
          نام محصول
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 px-4 py-2 border rounded-lg"
          />
        </label>

        <label className="flex flex-col font-medium">
          قیمت (تومان)
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="mt-2 px-4 py-2 border rounded-lg"
          />
        </label>

        <label className="flex flex-col font-medium">
          توضیحات
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-2 px-4 py-2 border rounded-lg resize-y"
          />
        </label>

        <label className="flex flex-col font-medium">
          تصویر جدید (اختیاری)
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2"
          />
          {formData.image && (
            <span className="text-sm mt-1 text-green-700">
              فایل انتخاب‌شده: {formData.image.name}
            </span>
          )}
        </label>

        {loading && <p className="text-blue-600">در حال ارسال...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">محصول ویرایش شد 🎉</p>}

        <Button
          type="submit"
          name={loading ? "در حال ارسال..." : "ویرایش محصول"}
          className={`mt-4 w-full ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-3 rounded-lg font-semibold transition-colors`}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default UpdateproductsPage;
