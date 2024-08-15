import React , { useState } from "react";

function FooterAuth() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-mainBg flex justify-center -mt-3">
      <div className="">
        <div className="md:text-left text-center container mx-auto  px-6">
          <p className="mb-2">UniProjectHub &copy; {currentYear} Created by APN Team</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterAuth;
