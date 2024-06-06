import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
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

const navLinks = [
  {
    title: "Task",
    icon: <LuLayoutDashboard />,
    path: `/du-an-nhom/${ALL_TASK}`,
  },
  {
    title: "To Do",
    icon: <LuListTodo />,
    path: `/du-an-nhom/${TASK_TODO}`,
  },
  {
    title: "In Progress",
    icon: <GiSandsOfTime />,
    path: `/du-an-nhom/${TASK_INPROGRESS}`,
  },
  {
    title: "Completed",
    icon: <MdOutlineTaskAlt />,
    path: `/du-an-nhom/${TASK_COMPLETED}`,
  },
  {
    title: "Pending",
    icon: <GrDocumentTime />,
    path: `/du-an-nhom/${TASK_PENDING}`,
  },
  {
    title: "Thành viên",
    icon: <HiOutlineUserGroup />,
    path: `/du-an-nhom/${MEMBERS}`,
  },

];

function TeamTaskSidebar() {
  //const dispatch = useDispatch();
  const location = useLocation();
  // const closeSidebar = () => {
  //   dispatch(setOpenSidebar(false));
  // };

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
  }, []);

  return (
    // <motion.div
    //   animate={isExpanded ? "expanded" : "nonexpanded"}
    //   variants={variants}
    //   className={
    //     "py-8 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative" +
    //     (isExpanded ? " px-2" : " px-2 duration-200")
    //   }
    // >
    //   <div
    //     onClick={() => setIsExpanded(!isExpanded)}
    //     className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-mainColor md:flex hidden justify-center items-center"
    //   >
    //     <img
    //       src={LeftArrowIcon}
    //       className={`w-2 ${!isExpanded && "rotate-180"}`}
    //     />
    //   </div>
    <div className='w-full h-full flex flex-col gap-6 p-5'>
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
                onClick={() => setActiveIndex(index)}
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

    // </motion.div>
  );
}

export default TeamTaskSidebar;
