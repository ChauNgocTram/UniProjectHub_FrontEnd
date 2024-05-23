import React, { useState, useEffect } from "react";

import mainicon from "../../assets/images/mainicon.png";
import {
  ArrowLeftRightIcon,
  BarChart3Icon,
  Clock4Icon,
  LayoutDashboard,
  HelpCircleIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import LeftArrowIcon from "../../assets/icons/leftArrow.svg";

const variants = {
  expanded: { width: "220px" },
  nonexpanded: { width: "70px" },
};

const navLinks = [
  {
    link: "Task",
    icon: LayoutDashboard,
  },
  {
    link: "Activity",
    icon: Clock4Icon,
  },
  {
    link: "Analytics",
    icon: BarChart3Icon,
  },
  {
    link: "Transactions",
    icon: ArrowLeftRightIcon,
  },
  {
    link: "Support",
    icon: HelpCircleIcon,
  },
];

function ProjectSidebarr() {
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
    <motion.div
      animate={isExpanded ? "expanded" : "nonexpanded"}
      variants={variants}
      className={
        "py-8 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative" +
        (isExpanded ? " px-2" : " px-2 duration-200")
      }
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-mainColor md:flex hidden justify-center items-center"
      >
        <img src={LeftArrowIcon} className={`w-2 ${!isExpanded && "rotate-180"}`} />
      </div>

      <div className="logo-div flex space-x-4 items-center">
        <img src={mainicon} className="md:w-10 w-8 ml-1" />
        <span className={!isExpanded ? "hidden" : "block mt-1 font-medium"}>UniProjectHub</span>
      </div>

      <div className="flex flex-col space-y-8 mt-8">
        {navLinks.map((item, index) => (
          <div className="nav-links w-full" key={index}>
            <div
              onClick={() => setActiveIndex(index)}
              className={
                "flex space-x-3 w-full p-2 rounded " +
                (activeIndex === index
                  ? "bg-mainColor text-white"
                  : " text-black") +
                (!isExpanded ? " pl-3" : "")
              }
            >
              <item.icon className="md:w-6 w-4" />
              <span className={!isExpanded ? "hidden" : "block"}>
                {item.link}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProjectSidebarr