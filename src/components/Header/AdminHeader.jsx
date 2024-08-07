import React from "react";

import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";

import UserAvatar from "../UserAvatar";

function AdminHeader() {
  return (
    <div className="flex items-center justify-between w-full bg-white p-4 shadow sticky top-0 z-10">
      <div className="flex items-center justify-center "></div>
      <div className="flex items-center space-x-3">
        <div className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
          <MdOutlineSearch className="text-gray-500 text-xl" />

          <input
            type="text"
            placeholder="Tìm kiếm...."
            className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
          />
        </div>

        <div className="px-6">
          <UserAvatar />
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
