import React from 'react'
import { Outlet } from "react-router-dom";
import FooterAuth from '../components/Footer/FooterAuth';

function AuthLayout() {
  return (
    <div>
        <Outlet/>
        <FooterAuth/>
    </div>
  )
}

export default AuthLayout