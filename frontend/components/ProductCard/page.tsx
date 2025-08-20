import React from "react";
import "./style.scss";
import { Edit, Trash } from "iconsax-reactjs";
import Image from "next/image";
const ProductCard = ({ product, onDelete, onEdite }: any) => {
  return (
    <>
      <div className="relative rounded-lg border shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        <Image
          src={`http://171.22.26.36:8080/${product.imagePath}`}
          alt={product.name}
          className="w-full h-48 object-cover"
          width={100}
          height={50}
          unoptimized
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-sm">{product.description}</p>
        </div>

        {/* آیکون‌های هاور */}
        <div
          className="absolute w-full h-full top-[0%] right-[0%] left-[0%] flex justify-center items-center gap-2 
  opacity-0 group-hover:opacity-80 transition-opacity duration-100 
  backdrop-blur-md bg-white/20 border border-white/40 rounded-lg p-2"
        >
          <button
            onClick={() => onEdite(product._id)}
            className="p-2 border rounded-md hover:shadow w-auto h-max"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="p-2 border rounded-md hover:shadow w-auto h-max"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
