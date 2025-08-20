"use client";
import React from "react";
import "./style.scss";
import { User, TickCircle, Clock, Moneys, Money4, Lock } from "iconsax-reactjs";

type TableStatus = "empty" | "occupied" | "reserved";

interface TabelCardProps {
  tableId: number;
  onSelect: (orderData: any) => void;
  status?: TableStatus;
  isSelected?: boolean; // ✅ فقط برای نمایش حالت انتخاب‌شده
}

const TabelCard: React.FC<TabelCardProps> = ({ tableId, onSelect, status, isSelected }) => {
  const handleClick = () => {
    const orderData = {
      tableId,
      items: [
        { name: "چای", price: 20000, count: 2, status: "reserved" },
        { name: "سالاد", price: 50000, count: 2 },
        { name: "پیتزا", price: 120000, count: 2 },
        { name: "نوشابه", price: 30000, count: 2 },
      ],
    };
    onSelect(orderData);
  };

  return (
    <main
      onClick={handleClick}
      className={`relative flex flex-col justify-center items-center border px-2 py-5 rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
        isSelected
          ? "bg-green-100/30 border-green-400"
          : "bg-background border-gray-500 shadow-gray-800"
      }`}
    >
      {isSelected && (
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <TickCircle size="48" color="#22c55e" variant="Bold" />
        </div>
      )}

      <div className="max-w-lg opacity-100">
        <div className="flex flex-col justify-between items-center border-b">
          <h2 className="text-xl flex flex-col">
            میز
            <span>{tableId}</span>
          </h2>
        </div>

        <div>
          <div className="flex justify-between border-b">
            <div className="flex justify-start items-center gap-2 align-sub px-10 border-l py-1">
              {status === "reserved" && (
                <div className="absolute top-2 left-2 z-10">
                  <Lock size="20" color="#ff4d4f" />
                </div>
              )}
              {status === "occupied" && (
                <div className="absolute top-2 left-2 z-10">
                  <User size="20" color="#facc15" />
                </div>
              )}
              {status === "empty" && (
                <div className="absolute top-2 left-2 z-10">
                  <TickCircle size="20" color="#22c55e" />
                </div>
              )}
            </div>
            <div className="flex justify-start items-center align-sub gap-2 px-10 py-1">
              <Clock size={20} />
              12:26
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-start px-8 items-center gap-2 border-l py-3">
              <Moneys size={19} />
              <span className="text-sm flex">250,000</span>
            </div>
            <div className="flex justify-center items-center px-10 py-3 gap-2">
              <Money4 color="green" size={20} />
              <span className="text-sm text-green-400">پرداخت شده</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TabelCard;
