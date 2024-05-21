import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

function CommonLayout() {
  return (
    <div>
      <Navbar />
      <div className="wrapper-body">
        <Outlet />
      </div>

      
    </div>
  );
}

export default CommonLayout;
