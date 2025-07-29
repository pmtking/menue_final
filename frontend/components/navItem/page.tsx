import React from "react";
import "./style.scss";
import { NavItemtype } from "@/types/globaltypes";

const NavItem = ({ name, link , icon }: NavItemtype) => {
  return (
    <div className="nav-item">
      <a href={link} className="nav-link">
        {icon}
        <span className="text-[10px]">{name}</span>
      </a>
    </div>
  );
};

export default NavItem;
