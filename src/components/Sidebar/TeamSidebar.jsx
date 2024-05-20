import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineFileSearch, AiOutlineIdcard } from "react-icons/ai";
import { ALL_TEAM_PROJECTS} from "../../routes/constant";

function TeamSidebar() {
  const Menus = [
    {
      title: "Dự án",
      icon: <AiOutlineFileSearch />,
      path: `/${ALL_TEAM_PROJECTS}`,
    },
    {
      title: "Thảo luận",
      icon: <AiOutlineIdcard />,
      path: "",
    },
  ];
  return (
    <div className="flex pr-4">
      <div
        className={` ${
          open ? "w-64" : "w-20 "
        } bg-white h-auto p-5 pt-7 relative duration-300 `}
      >
        <ul className="pr-2 border-r-2 border-neutral-200">
          {Menus.map((Menu, index) => (
            <NavLink
              key={index}
              to={Menu.path}
              className="text-decoration-none"
            >
              <li
                key={index}
                className={`flex my-2 rounded-md p-2 cursor-pointer hover:bg-mainBg/20 text-black  text-sm items-center gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-mainBg text-black"
                } `}
              >
                <span style={{ fontSize: "24px" }}>{Menu.icon}</span>

                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamSidebar;
