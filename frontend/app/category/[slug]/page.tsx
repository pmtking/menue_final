"use client";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useState } from "react";

const products  = [
  {
    id: 1,
    title: "پیتزای مخصوص",
    image: "/images/pizza.jpg",
    price: "۱۲۰٬۰۰۰ تومان",
  },
  {
    id: 2,
    title: "پیتزای قارچ و گوشت",
    image: "/images/pizza-mushroom.jpg",
    price: "۱۳۰٬۰۰۰ تومان",
  },
  {
    id: 3,
    title: "پیتزای سبزیجات",
    image: "/images/veggie-pizza.jpg",
    price: "۹۸٬۰۰۰ تومان",
  },
  {
    id: 4,
    title: "پیتزای مارگاریتا",
    image: "/images/margarita.jpg",
    price: "۱۱۰٬۰۰۰ تومان",
  },
];

const CategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
   const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );
 
  return (
    <div className="w-full min-h-screen bg-[#1a1a1a] text-white px-4 sm:px-6 lg:px-8 py-10 pb-32">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        🍕 پیتزاهای خوشمزه ما
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="جستجوی محصول..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 w-full px-2 sm:px-4 max-w-4xl mx-auto">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-[#2a2a2a] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-sm font-semibold mb-2">{product.title}</h2>
              <p className="text-xs text-gray-400 mb-3">{product.price}</p>
              <button className="bg-[#EB9200] hover:bg-orange-500 transition text-white py-1.5 text-sm px-4 rounded-full w-full">
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-2 text-center text-gray-400 text-sm mt-6">
            هیچ محصولی با این نام یافت نشد.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
