import React from "react";
import { Outlet } from "react-router-dom";
import CommonHeader from "../components/Header/CommonHeader";
import ProjectSidebarr from "../components/Sidebar/ProjectSidebarr";

function TeamLayout() {
  return (
    <div>
      <div className="h-screen flex ">
        <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
          <ProjectSidebarr />
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

export default TeamLayout;
