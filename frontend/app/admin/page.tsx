'use client';

import { useRouter } from 'next/navigation';
import './style.scss'
const AdminPage = () => {
  const router = useRouter();

  const sections = [
    { name: 'افزودن محصول', path: '/admin/addProduct' },
    { name: 'انبار', path: '/admin/inventory' },
    { name: 'فاکتورها', path: '/admin/invoices' },
    { name: 'سفارشات', path: '/admin/orders' },
    { name: 'کاربران', path: '/admin/users' },
    { name: 'کاربران', path: '/admin/users' },
  ];

  return (
    <div className="min-h-screen  p-6 flex flex-col ">
      <h1 className="text-3xl font-bold text-center mb-8">داشبورد مدیریت</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow mb-[150px]">
        {sections.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className=" cart p-15 rounded-2xl shadow-md hover:shadow-xl  border  transition-all text-center"
          >
            <span className="text-xl font-semibold">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
