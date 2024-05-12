import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function HeaderAuth() {
  const [showMenu, setShowMenu] = useState(false);
  //const { isLoggedIn, username, logout } = useAuth();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    if (window.scrollY >= 50) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);

  const location = useLocation();

  return (
    <>
      <nav
        className={`fixed top-0 right-0 w-full flex justify-between items-center z-50 font-semibold ${
          header
            ? "bg-[#333] backdrop-blur-sm text-white shadow-md"
            : "bg-[#333]  text-white"
        }`}
      >
        <div className="bg-gradient-to-r from-primary to-secondary text-white font-semibold"></div>
        <div className="container  sm:block hidden font-semibold">
          <div className="flex flex-row justify-between items-center w-full ">
            <div className="flex items-center justify-center mx-6 gap-2 font-bold text-2xl basis-3/6">
              logo
            </div>
            <div className="hidden lg:flex mx-4 w-full justify-end">
              <ul className="flex items-center gap-6 font-semibold mx-4">
                <li className="py-4 m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li className="py-4 m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Đăng nhập
                  </NavLink>
                </li>
                <li className="py-4 m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Đăng kí
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} /> */}
      </nav>
    </>
  );
}

export default HeaderAuth;
