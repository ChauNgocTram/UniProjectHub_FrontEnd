import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
//import { useDispatch } from "react-redux";

import {
  AiOutlineSetting,
  AiOutlineSolution,
  AiOutlineBook,
  AiOutlineRead,
  AiOutlineFundProjectionScreen,
  AiOutlineTags,
  AiOutlineHdd,
  AiOutlineUngroup,
  AiOutlineApartment,
  AiOutlineDown,
  AiOutlineUp,
  AiOutlineShop,
  AiOutlineLogout,
} from "react-icons/ai";

import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

import mainicon from "../../assets/images/mainicon.png";

function ProjectSidebar() {
  const location = useLocation();
  //const dispatch = useDispatch();
  const isActive = (path) => location.pathname === path;

  const [open, setOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const Menus = [
    {
      title: "Tasks",
      icon: <AiOutlineSolution />,
      path: "/staff/all-request",
    },

    {
      title: "Not Start",
      icon: <AiOutlineSetting />,
      path: "/staff/construction-config",
    },

    {
      title: "In Progress",
      icon: <AiOutlineBook />,
      submenu: [
        { title: "Create Project", path: "/staff/create-sample-project" },
        { title: "Project List", path: "/staff/list-project" },
      ],
    },
    {
      title: "Complete",
      icon: <AiOutlineFundProjectionScreen />,
      submenu: [
        { title: "Create News", path: "/staff/create-news" },
        { title: "News List", path: "/staff/list-news" },
      ],
    },
    {
      title: "Thành viên",
      icon: <AiOutlineFundProjectionScreen />,
      submenu: [
        { title: "Create News", path: "/staff/create-news" },
        { title: "News List", path: "/staff/list-news" },
      ],
    },
    {
      title: "Pending",
      icon: <AiOutlineRead />,
      submenu: [
        { title: "Create Blog", path: "/staff/create-blog" },
        { title: "Blog List", path: "/staff/list-blog" },
      ],
    },
  ];

  const toggleSubMenu = (index) => {
    setActiveSubMenu(activeSubMenu === index ? null : index);
  };

  return (
    <>
      <div className=" flex w-72.5 overflow-y-auto duration-300 ease-linear scrollbar-thin scrollbar-none scrollbar-track-gray-100 border-r shadow-sm">
        <div
          className={`${
            open ? "w-64" : "w-24"
          } bg-white h-screen p-5 pt-7 relative duration-300`}
        >
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex gap-x-4 items-center">
              <img
                src={mainicon}
                className={`cursor-pointer duration-500 w-10 ${
                  open 
                }`}
              />
              <h1
                className={`text-black origin-left font-medium text-xl duration-200 ${
                  !open && "hidden"
                }`}
              >
                UniProjectHub
              </h1>
            </NavLink>
            <div
              className={` cursor-pointer top-9 w-7  border-baseGreen
     border-2 rounded-full ml-10  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            >
              <MdKeyboardDoubleArrowLeft />
            </div>
            {/* <img
            src={control}
            className={` cursor-pointer top-9 w-7  border-baseGreen
     border-2 rounded-full ml-10  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          /> */}
          </div>
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <React.Fragment key={index}>
                {menu.label && open ? (
                  <li
                    key={`label-${index}`}
                    className="text-gray-500 uppercase font-bold text-md mb-2 mt-8"
                  >
                    {menu.label}
                  </li>
                ) : null}
                {!menu.label ? (
                  <>
                    <NavLink
                      key={index}
                      to={menu.path}
                      className="text-decoration-none "
                    >
                      <li
                        // key={index}
                        onClick={() => toggleSubMenu(index)}
                        // className={`flex rounded-md p-2 cursor-pointer hover:bg-baseGreen text-black hover:text-white text-sm items-center gap-x-4
                        // ${menu.gap ? "mt-9" : "mt-2"} ${
                        //   index === 0 && "bg-baseGreen text-white"
                        // } `}

                        className={`flex rounded-md p-2 my-2 cursor-pointer ${
                          isActive(menu.path)
                            ? "bg-baseGreen text-white"
                            : "hover:bg-base4 text-black hover:text-white"
                        } text-sm items-center gap-x-4`}
                      >
                        <span style={{ fontSize: "22px" }}>{menu.icon}</span>
                        <span
                          className={`${
                            !open && "hidden"
                          } origin-left duration-200`}
                        >
                          {menu.title}
                        </span>
                        {menu.submenu && (
                          <span
                            className={`ml-auto ${open ? "block" : "hidden"}`}
                          >
                            {activeSubMenu === index ? (
                              <AiOutlineUp />
                            ) : (
                              <AiOutlineDown />
                            )}
                          </span>
                        )}
                      </li>
                    </NavLink>

                    {menu.submenu && activeSubMenu === index && (
                      <ul className={`pl-6 ${open ? "block" : "hidden"}`}>
                        {menu.submenu.map((submenu, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={submenu.path}
                            className="text-decoration-none"
                          >
                            <li
                              className={`flex rounded-md p-2 my-2 cursor-pointer ${
                                location.pathname === submenu.path
                                  ? "bg-baseGreen text-white"
                                  : "hover:bg-base3 text-black hover:text-white"
                              } text-sm items-center gap-x-4`}
                            >
                              <span style={{ fontSize: "24px" }}>&nbsp;</span>
                              <span
                                className={`${
                                  !open && "hidden"
                                } origin-left duration-200`}
                              >
                                {submenu.title}
                              </span>
                            </li>
                          </NavLink>
                        ))}
                      </ul>
                    )}
                  </>
                ) : null}
              </React.Fragment>
            ))}
            <NavLink
              to={"/auth"}
              //  onClick={handleSignout}
              className="text-decoration-none"
            >
              <li className="flex my-2 rounded-md p-2 cursor-pointer hover:bg-baseGreen text-black hover:text-white text-sm items-center gap-x-4 mt-2">
                <span className="text-2xl">
                  <AiOutlineLogout />
                </span>
                <span className={open ? "inline-block" : "hidden"}>Logout</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProjectSidebar;
