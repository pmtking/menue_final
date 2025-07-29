import React from "react";
import { SearchNormal1 } from "iconsax-reactjs";

const SearchBar = () => {
  return (
    <div className="max-w-3xl mx-auto w-full flex items-center bg-white/10 backdrop-blur-md rounded-full px-5 py-3 shadow-lg">
      <SearchNormal1 size={20} className="text-white" />
      <input
        type="text"
        placeholder="جستجو محصول یا دسته‌بندی..."
        className="bg-transparent text-white placeholder-white/50 w-full px-4 outline-none"
      />
      <button className="bg-[#EB9200] text-white px-4 py-2 rounded-full text-sm font-semibold">
        جستجو
      </button>
    </div>
  );
};

export default SearchBar;
