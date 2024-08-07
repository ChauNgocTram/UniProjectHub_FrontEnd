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
  ALL_TEAM_PROJECTS,
  MEMBERS,
  TASK_COMPLETED,
  TASK_INPROGRESS,
  TASK_PENDING,
  TASK_TODO,
} from "../../routes/constant";

import task from "../../assets/images/task.png";
import todo from "../../assets/images/todo.png";
import inprogress from "../../assets/images/inprogress.png";
import completed from "../../assets/images/completed.png";
import pending from "../../assets/images/pending.png";
import member from "../../assets/images/member.png";

const variants = {
  expanded: { width: "220px" },
  nonexpanded: { width: "70px" },
};

function TeamTaskSidebar({ taskId, onSelectStatus }) {

  const navLinks = [
    {
      title: "Task",
      //  icon: <LuLayoutDashboard />,
      image: task,
      path: `/du-an-nhom/${ALL_TASK.replace(":id", taskId)}`,
      status: null,
    },
    {
      title: "To Do",
      //  icon: <LuListTodo />,
      image: todo,
      path: `/du-an-nhom/${TASK_TODO.replace(":id", taskId)}`,
      status: 1,
    },
    {
      title: "In Progress",
      // icon: <GiSandsOfTime />,
      image: inprogress,
      path: `/du-an-nhom/${TASK_INPROGRESS.replace(":id", taskId)}`,
      status: 2,
    },
    {
      title: "Completed",
      //  icon: <MdOutlineTaskAlt />,
      image: completed,
      path: `/du-an-nhom/${TASK_COMPLETED.replace(":id", taskId)}`,
      status: 3,
    },
    {
      title: "Pending",
      // icon: <GrDocumentTime />,
      image: pending,
      path: `/du-an-nhom/${TASK_PENDING.replace(":id", taskId)}`,
      status: 4,
    },
    {
      title: "Thành viên",
      // icon: <HiOutlineUserGroup />,
      image: member,
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
    <div className="w-full h-full flex justify-center items-center flex-col gap-6 px-3 py-5">
      <NavLink
        to={`/${ALL_TEAM_PROJECTS}`}
        className="flex space-x-2 items-center justify-center mx-auto ml-8"
      >
        <img src={mainicon} className="md:w-14 w-8" />
        <span className={!isExpanded ? "hidden" : "block mt-1 font-medium"}>
          UniProjectHub
        </span>
      </NavLink>

      <div className="flex-1 flex flex-col gap-y-5 py-4 w-full px-3">
        {navLinks.map((item, index) => (
          <div className="w-full" key={index}>
            <NavLink key={index} to={item.path}>
              <div
                onClick={() => handleNavClick(index, item.status)}
                className={
                  "flex items-center gap-2 space-x-3 w-full px-2 py-2 rounded " +
                  (activeIndex === index
                    ? "bg-blueLevel2 text-blueLevel5 font-semibold"
                    : " text-black hover:bg-slate-200") +
                  (!isExpanded ? " pl-3 " : "")
                }
              >
                {/* <span style={{ fontSize: "22px" }}>{item.icon}</span> */}
                <img src={item.image} alt="" width={30} height={30} />
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