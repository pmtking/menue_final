import React, { useState } from "react";
import "./style.scss";
import { CalendarTick, Image, ShoppingCart, SidebarLeft, User } from "iconsax-reactjs";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <User />, label: "لیست کاربران" },
    { icon: <Image />, label: "گالری عکس" },
    { icon: <ShoppingCart />, label: "محصولات" },
    { icon: <ShoppingCart />, label: "سفارش‌ها" },
    { icon: <CalendarTick />, label: "رزرو میزها" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <SidebarLeft />
      </div>
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
