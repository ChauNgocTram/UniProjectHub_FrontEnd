import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import mainicon from "../../assets/images/mainicon.png";
import { LuLayoutDashboard, LuListTodo } from "react-icons/lu";
import { GiSandsOfTime } from "react-icons/gi";
import { GrDocumentTime } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineTaskAlt } from "react-icons/md";
import {
  ALL_TASK,
  MEMBERS,
  TASK_COMPLETED,
  TASK_INPROGRESS,
  TASK_PENDING,
  TASK_TODO,
} from "../../routes/constant";

const variants = {
  expanded: { width: "220px" },
  nonexpanded: { width: "70px" },
};

function TeamTaskSidebar({ taskId, onSelectStatus }) {
  const location = useLocation();

  const navLinks = [
    {
      title: "Task",
      icon: <LuLayoutDashboard />,
      path: `/du-an-nhom/${ALL_TASK.replace(":id", taskId)}`,
      status: null,
    },
    {
      title: "To Do",
      icon: <LuListTodo />,
      path: `/du-an-nhom/${TASK_TODO.replace(":id", taskId)}`,
      status: 1,
    },
    {
      title: "In Progress",
      icon: <GiSandsOfTime />,
      path: `/du-an-nhom/${TASK_INPROGRESS.replace(":id", taskId)}`,
      status: 2,
    },
    {
      title: "Completed",
      icon: <MdOutlineTaskAlt />,
      path: `/du-an-nhom/${TASK_COMPLETED.replace(":id", taskId)}`,
      status: 3,
    },
    {
      title: "Pending",
      icon: <GrDocumentTime />,
      path: `/du-an-nhom/${TASK_PENDING.replace(":id", taskId)}`,
      status: 4,
    },
    {
      title: "Thành viên",
      icon: <HiOutlineUserGroup />,
      path: `/du-an-nhom/${MEMBERS.replace(":id", taskId)}`,
      status: null,
    },
  ];

  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const handleNavClick = (index, status) => {
    setActiveIndex(index);
    onSelectStatus(status);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <NavLink to="/" className="flex gap-1 space-x-4 items-center">
        <img src={mainicon} className="md:w-10 w-8 ml-1" />
        <span className={!isExpanded ? "hidden" : "block mt-1 font-medium"}>
          UniProjectHub
        </span>
      </NavLink>

      <div className="flex-1 flex flex-col gap-y-5 py-8 ">
        {navLinks.map((item, index) => (
          <div className="w-full" key={index}>
            <NavLink key={index} to={item.path}>
              <div
                onClick={() => handleNavClick(index, item.status)}
                className={
                  "flex gap-2 space-x-3 w-full px-2 py-2 rounded " +
                  (activeIndex === index
                    ? "bg-mainColor text-white"
                    : " text-black hover:bg-slate-200") +
                  (!isExpanded ? " pl-3 " : "")
                }
              >
                <span style={{ fontSize: "22px" }}>{item.icon}</span>
                <span className={!isExpanded ? "hidden" : "block"}>
                  {item.title}
                </span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamTaskSidebar;
