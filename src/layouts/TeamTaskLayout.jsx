import React from "react";
import { Outlet } from "react-router-dom";
import CommonHeader from "../components/Header/CommonHeader";
import TeamTaskSidebar from "../components/Sidebar/TeamTaskSidebar";

function TeamTaskLayout() {
  return (
    <div>
      <div className="h-screen flex ">
        <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
          <TeamTaskSidebar />
        </div>

        <div className="flex-1 overflow-y-auto sticky top-0">
          <CommonHeader />
          <div className="p-4 2xl:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamTaskLayout;
