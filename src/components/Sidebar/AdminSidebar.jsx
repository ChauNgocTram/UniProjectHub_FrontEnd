import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoFileTrayStackedOutline } from "react-icons/io5";
import { BsBookmarks, BsChatDots } from "react-icons/bs";
import { DASHBOARD } from "../../routes/constant";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice"; 

import mainicon from "../../assets/images/mainicon.png";

function AdminSidebar() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();

  const Menus = [
    {
      icon: <HiOutlinePresentationChartBar />,
      path: `/admin/${DASHBOARD}`,
      title: "Thống kê",
    },
    {
      icon: <HiOutlineUserGroup />,
      path: `/admin/manage-user`,
      title: "Quản lý tài khoản",
    },
    {
      icon: <IoExitOutline />,
      path: `/`,
      title: "Đăng xuất",
      onClick: () => dispatch(logout()), // Handle logout
    },
  ];

  useEffect(() => {
    const activePath = location.pathname;
    const index = Menus.findIndex((menu) => menu.path === activePath);
    setActiveIndex(index);
  }, [location.pathname, Menus]);

  return (
    <div className="flex flex-col bg-white w-[250px] h-screen border-r-2 border-neutral-200 pt-2">
      <div className="flex space-x-2 items-center justify-center mx-auto mb-6">
        <img src={mainicon} className="md:w-14 w-8" />
        <span className="block mt-1 font-medium">UniProjectHub</span>
      </div>
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
              onClick={() => {
                setActiveIndex(index);
                if (Menu.onClick) Menu.onClick(); // Handle click event if exists
              }}
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

export default AdminSidebar;
