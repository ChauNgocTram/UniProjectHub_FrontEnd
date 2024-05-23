import React from "react";
import { Outlet } from "react-router-dom";
import CommonHeader from "../components/Header/CommonHeader";
import ProjectSidebar from "../components/Sidebar/ProjectSidebar";
import ProjectSidebarr from "../components/Sidebar/ProjectSidebarr";

function TeamLayout() {
  return (
    <div>
      <div className="">
        <div className="h-screen flex-1">
          <div className="sticky top-0 z-50 w-full">
            <CommonHeader />
          </div>
          <div className="flex">
            <ProjectSidebarr />
            <div className="lg:w-[1280px] mt-6 mx-auto mb-0">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamLayout;
