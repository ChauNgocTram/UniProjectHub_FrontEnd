import React, { useState }  from "react";
import { PROFILE } from "../../routes/constant";

import { LuUser2, LuKeyRound } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const UserSidebar = ({ activepage }) => {
  return (
    <div className="usersidebar w-full h-full flex flex-col b">
      {activepage === "thong-tin-ca-nhan" ? (
        <div className="s2 flex items-center gap-3 px-5 py-4 mb-4 bg-mainBg font-medium rounded-md cursor-pointer text-gray-700">
          <LuUser2 />
          <span>Thông tin cá nhân</span>
        </div>
      ) : (
        <>
          <NavLink to="/quan-ly-ho-so/thong-tin-ca-nhan">
            <div className="s1 flex items-center gap-3 px-5 py-4 mb-4 hover:bg-slate-200 rounded-md cursor-pointer text-gray-700">
              <LuUser2 />
              <span>Thông tin cá nhân</span>
            </div>
          </NavLink>
        </>
      )}

      {activepage === "thay-doi-mat-khau" ? (
        <div className="s2 flex items-center gap-3 px-5 py-4 bg-mainBg font-medium rounded-md cursor-pointer text-gray-700">
          <LuKeyRound />
          <span>Đổi mật khẩu</span>
        </div>
      ) : (
        <>
          <NavLink to="/quan-ly-ho-so/thay-doi-mat-khau">
            <div className="s1 flex items-center gap-3 px-5 py-4 hover:bg-slate-200 rounded-md cursor-pointer text-gray-700">
              <LuKeyRound />
              <span>Đổi mật khẩu</span>
            </div>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default UserSidebar;
