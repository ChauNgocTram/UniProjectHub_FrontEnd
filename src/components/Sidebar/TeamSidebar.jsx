import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { BsBookmarks, BsChatDots } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { ALL_TEAM_PROJECTS, CREATE_TEAM_PROJECT, GROUP_CHAT, SAVED_TEAM_PROJECT } from "../../routes/constant";

function TeamSidebar() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);

  const Menus = [
    {
      icon: <IoFileTrayStackedOutline />,
      path: `/${ALL_TEAM_PROJECTS}`,
      title: "Tất cả dự án",
    },
    {
      icon: <BsBookmarks />,
      path: `/${SAVED_TEAM_PROJECT}`,
      title: "Dự án đã lưu",
    },
    {
      icon: <IoAdd />,
      path: `/${CREATE_TEAM_PROJECT}`,
      title: "Tạo dự án",
    },
  ];

  useEffect(() => {
    const activePath = location.pathname;
    const index = Menus.findIndex(menu => menu.path === activePath);
    setActiveIndex(index);
  }, [location.pathname, Menus]);

  return (
    <div className="flex bg-white w-[250px] h-screen border-r-2 border-neutral-200 pt-2">
      <div className="px-4">
        <ul className="">
          {Menus.map((Menu, index) => (
            <NavLink
              key={index}
              to={Menu.path}
              className={
                "flex -z-10 mb-2 gap-1 space-x-1 w-full px-5 py-2 rounded " +
                (activeIndex === index
                  ? "bg-blueLevel1 text-blueLevel5 font-bold"
                  : "text-gray-800 hover:bg-slate-200 ")
              }
              onClick={() => setActiveIndex(index)}
            >
              <span style={{ fontSize: "22px" }}>{Menu.icon}</span>
              <span className="">{Menu.title}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamSidebar;
