import React , { useState } from "react";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Header/AdminHeader";

function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="mt-0 flex-1 overflow-y-hidden">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
