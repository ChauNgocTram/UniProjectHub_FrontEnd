import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

import mainicon from "../../assets/images/mainicon.png";

import { ALL_PERSONAL_PROJECTS, ALL_PERSONAL_TASK, PERSONAL_TASK_COMPLETED, PERSONAL_TASK_INPROGRESS, PERSONAL_TASK_PENDING, PERSONAL_TASK_TODO } from "../../routes/constant";
import task from "../../assets/images/task.png";
import todo from "../../assets/images/todo.png";
import inprogress from "../../assets/images/inprogress.png";
import completed from "../../assets/images/completed.png";
import pending from "../../assets/images/pending.png";



function PersonalTaskSidebar({ taskId, onSelectStatus }) {
  const navLinks = [
    {
      title: "Task",
      image: task,
      path: `/du-an-ca-nhan/${ALL_PERSONAL_TASK.replace(":id", taskId)}`,
      status: null,
    },
    {
      title: "To Do",
      image: todo,
      path: `/du-an-ca-nhan/${PERSONAL_TASK_TODO.replace(":id", taskId)}`,
      status: 1,
    },
    {
      title: "In Progress",
      image: inprogress,
      path: `/du-an-ca-nhan/${PERSONAL_TASK_INPROGRESS.replace(":id", taskId)}`,
      status: 2,
    },
    {
      title: "Completed",
      image: completed,
      path: `/du-an-ca-nhan/${PERSONAL_TASK_COMPLETED.replace(":id", taskId)}`,
      status: 3,
    },
    {
      title: "Pending",
      image: pending,
      path: `/du-an-ca-nhan/${PERSONAL_TASK_PENDING.replace(":id", taskId)}`,
      status: 4,
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
        to={`/${ALL_PERSONAL_PROJECTS}`}
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

export default PersonalTaskSidebar;
