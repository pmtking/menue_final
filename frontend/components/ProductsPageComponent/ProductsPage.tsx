// components/ProductsPage.tsx
"use client";

import { useEffect, useState } from "react";
import api from "@/libs/axios";
import ProductCard from "@/components/ProductCard/page";
import Button from "@/components/Button/page";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price?: number;
  inStock?: boolean;
}

const ProductsPageComponents = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/product/show");
        if (data?.data) setProducts(data.data);
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("آیا از حذف این محصول مطمئن هستید؟")) return;

    try {
      await api.delete(`/api/product/delete/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("خطا در حذف محصول:", error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/updateProducts/${id}`);
  };

  const filteredProducts = products.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen py-10 px-2">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold text-center mb-3">لیست محصولات</h1>
        <Button
          name="افزودن محصول"
          className="w-max"
          as="link"
          href="/admin/addProduct"
        />
      </div>

      <div className="max-w-md mx-auto mb-8 mt-10">
        <input
          type="text"
          placeholder="جستجوی محصول..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onEdite={handleEdit}
            />
          ))
        ) : (
          <p className="text-center col-span-3">
            محصولی با این مشخصات یافت نشد.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPageComponents;
