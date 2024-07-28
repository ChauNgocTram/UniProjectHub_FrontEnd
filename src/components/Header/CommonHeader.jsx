import React from "react";
//import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";

import UserAvatar from "../UserAvatar";
import NotificationPanel from "../Notification";
import { ALL_TEAM_PROJECTS } from "../../routes/constant";

function CommonHeader() {
  //const user = useSelector((state) => state?.user?.user);
  return (
    <div className="flex items-center justify-between w-full bg-white p-4 shadow sticky top-0 ">
      <div className="flex items-center justify-center ">
        <div
         // to={`/${ALL_TEAM_PROJECTS}`}
          onClick={() => window.history.back()}
          className="mx-4 p-3 rounded-lg hover:bg-slate-200"
        >
          <div className="">
            <MdArrowBackIosNew />
          </div>
        </div>
        <span className="font-semibold">Nhiệm vụ</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
          <MdOutlineSearch className="text-gray-500 text-xl" />

          <input
            type="text"
            placeholder="Tìm kiếm...."
            className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
          />
        </div>

        <div>
          <NotificationPanel />
        </div>

        
        <div>
          <UserAvatar />
        </div>
      </div>
    </div>
  );
}

export default CommonHeader;
