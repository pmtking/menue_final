"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { BagHappy, Gallery, Home2, SearchNormal1, UserAdd } from "iconsax-reactjs";
import NavItem from "../navItem/page";
import Button from "../Button/page";
import "./style.scss";

const navItems = [
  { name: "خانه", link: "/", icon: <Home2 size={27} /> },
  { name: " سفارشات", link: "/", icon: <BagHappy size={27} /> },
  { name: " گالری", link: "/", icon: <Gallery size={27} /> },
  { name: " ورود", link: "/login", icon: <UserAdd size={27} /> },
];

const NavBar = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    gsap.from(navbarRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={navbarRef}
      className="navbar fixed bottom-2 left-1/2 -translate-x-1/2 flex justify-between items-center w-[95%] max-w-3xl text-white bg-[#181818] rounded-full shadow-lg px-4 py-2 sm:px-6 sm:py-3"
    >
      {/* Nav Items */}
      <div className="flex mx-auto justify-center gap-10 ">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            name={item.name}
            link={item.link}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Actions (Search/Login) */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Optional: Search or Login */}
        {/* <InputSearch icon={<SearchNormal1 size={20} />} /> */}
        {/* <Button name="ورود / ثبت‌نام" type="button" className="bor " /> */}
    
      </div>
    </div>
  );
};

export default NavBar;
