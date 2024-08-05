import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { BsBookmarks, BsChatDots } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { ALL_PERSONAL_PROJECTS, CREATE_PERSONAL_PROJECT,  } from "../../routes/constant";

import backlog from "../../assets/images/backlog.png";
import add from "../../assets/images/add.png";

function PersonalSideBar() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);

  const Menus = [
    {
      //icon: <IoFileTrayStackedOutline />,
      image: backlog,
      path: `/${ALL_PERSONAL_PROJECTS}`,
      title: "Dự án của tôi",
    },
    {
     // icon: <IoAdd />,
      image: add,
      path: `/${CREATE_PERSONAL_PROJECT}`,
      title: "Tạo dự án",
    },
  ];

  useEffect(() => {
    const activePath = location.pathname;
    const index = Menus.findIndex(menu => menu.path === activePath);
    setActiveIndex(index);
  }, [location.pathname, Menus]);

  return (
    <div className="flex bg-white w-[260px] h-screen border-r-2 border-neutral-200 pt-2">
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
              {/* <span style={{ fontSize: "22px" }}>{Menu.icon}</span> */}
              <img src={Menu.image} alt="" width={25} height={10} />
              <span className="">{Menu.title}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PersonalSideBar;
