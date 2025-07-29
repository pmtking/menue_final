'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';

dayjs.extend(jalaliday);

interface Invoice {
  id: number;
  customer: string;
  date: string; // ISO (میلادی) YYYY-MM-DD
  amount: number;
}

const sampleInvoices: Invoice[] = [
  { id: 1, customer: 'علی', date: '2025-07-20', amount: 250000 },
  { id: 2, customer: 'مریم', date: '2025-07-21', amount: 480000 },
  { id: 3, customer: 'حسن', date: '2025-07-19', amount: 125000 },
  { id: 4, customer: 'سارا', date: '2025-07-18', amount: 340000 },
];

const InventoryPage = () => {
  const [searchDate, setSearchDate] = useState<string>('');

  // فیلتر فاکتورها بر اساس تاریخ شمسی انتخاب شده
  const filteredInvoices = searchDate
    ? sampleInvoices.filter(inv => {
        const invoiceJalali = dayjs(inv.date).calendar('jalali').locale('fa').format('YYYY-MM-DD');
        return invoiceJalali === searchDate;
      })
    : sampleInvoices;

  return (
    <div className="min-h-screen rtl font-sans flex flex-col">
      {/* هدر */}
      <header className="bg-white shadow-md py-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">مدیریت انبار - فاکتورها</h1>
      </header>

      {/* محتوا */}
      <main className="flex-grow max-w-7xl mx-auto p-6">
        {/* جستجو */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <label htmlFor="jalaliDate" className="text-gray-700 font-semibold">
            جستجو بر اساس تاریخ شمسی:
          </label>
          <input
            id="jalaliDate"
            type="date"
            value={searchDate}
            onChange={e => setSearchDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="YYYY-MM-DD"
          />
          <button
            onClick={() => setSearchDate('')}
            className=" text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            پاک کردن
          </button>
        </div>

        {/* جدول */}
        <div className="overflow-x-auto  rounded-lg shadow">
          <table className="w-full text-right border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-3">شماره فاکتور</th>
                <th className="border px-4 py-3">نام مشتری</th>
                <th className="border px-4 py-3">تاریخ (شمسی)</th>
                <th className="border px-4 py-3">مبلغ (تومان)</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    فاکتوری یافت نشد.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                    <td className="border px-4 py-3">{inv.id}</td>
                    <td className="border px-4 py-3">{inv.customer}</td>
                    <td className="border px-4 py-3">
                      {dayjs(inv.date).calendar('jalali').locale('fa').format('YYYY/MM/DD')}
                    </td>
                    <td className="border px-4 py-3">{inv.amount.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* فوتر (اختیاری) */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-600">
        © 2025 مدیریت انبار
      </footer>
    </div>
  );
};

export default InventoryPage;
