import type { InputSearch as InputSearchType } from "@/types/globaltypes";
import React, { useRef } from "react";
import Input from "../Input/page";
import './style.scss';

const InputSearch = ({ icon, onChange }: InputSearchType) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    const el = searchRef.current;
    if (!el) return;

    if (el.classList.contains("active")) {
      el.classList.remove("active");
      el.classList.add("closing");

      // بعد از انیمیشن، مخفی کن
      setTimeout(() => {
        el?.classList.remove("closing");
        el!.style.display = "none";
      }, 300); // باید با مدت زمان animation در CSS یکی باشه
    } else {
      el.style.display = "flex";
      requestAnimationFrame(() => {
        el.classList.add("active");
      });
    }
  };

  return (
    <div className="flex justify-start items-center mx-10 gap-2 input_search   ">
      <span onClick={handleToggle} id="icon" className="icon">{icon}</span>
      <Input
        name="search"
        placeholder="جستجو..."
        type="text"
        className="outline-none  active"
        id="search"
        ref={searchRef}
        onChange={onChange}
      />
    </div>
  );
};

export default InputSearch;
