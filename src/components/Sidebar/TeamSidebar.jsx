import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineFileSearch, AiOutlineIdcard } from "react-icons/ai";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { ALL_TEAM_PROJECTS, GROUP_CHAT } from "../../routes/constant";

function TeamSidebar() {
  const Menus = [
    {
      icon: <IoFileTrayStackedOutline />,
      path: `/${ALL_TEAM_PROJECTS}`,
    },
    {
      icon: <BsChatDots />,
      path: `/${GROUP_CHAT}`,
    },
  ];
  return (
    <div className="flex  bg-white w-[100px] h-[665px] border-r-2 border-neutral-200">
      <div className="px-4 w-[100px]">
        <ul className="">
          {Menus.map((Menu, index) => (
            <NavLink
              key={index}
              to={Menu.path}
              className="text-decoration-none"
            >
              <li
                key={index}
                className={`flex justify-center my-2 rounded-md p-4 cursor-pointer hover:bg-mainBg/20 text-black items-center gap-x-4 
           ${
                  index == 1 && "bg-mainBg text-neutral-700"
                } `}
              >
                <span style={{ fontSize: "28px" }}>{Menu.icon}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamSidebar;
