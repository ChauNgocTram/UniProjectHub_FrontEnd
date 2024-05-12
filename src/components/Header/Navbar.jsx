import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { LogoutOutlined } from "@ant-design/icons";

function Navbar() {
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
  // console.log('isLoggedIn', isLoggedIn);
  return (
    <>
      <nav
        className={`fixed top-0 right-0 w-full flex justify-between items-center z-50 font-semibold ${
          header
            ? "bg-black backdrop-blur-sm text-black shadow-md"
            : "bg-transparent text-black"
        }`}
      >
        <div className="bg-gradient-to-r from-primary to-secondary text-white font-semibold"></div>
        <div className="container py-[2px] sm:block hidden font-semibold">
          <div className="flex flex-row justify-between items-center w-full ">
            <div className="flex items-center justify-center mx-6 gap-4 font-bold text-2xl basis-1/6">
              {/* <MainLogo /> */}
            </div>
            <div className="hidden lg:flex mx-4 w-full justify-around">
              <ul className="flex items-center gap-6 font-semibold">
                <li className="py-4  m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Giới thiệu
                  </NavLink>
                </li>
                <li className="py-4 m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Dự án Teams
                  </NavLink>
                </li>
                <li className="py-4  m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Dự án cá nhân
                  </NavLink>
                </li>
                <li className="py-4  m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Dự thính lớp học
                  </NavLink>
                </li>
                <li className="py-4  m-1">
                  <NavLink
                    to="/"
                    className={` menuItem ${
                      location.pathname === "/" ? "activeNavbar" : ""
                    }`}
                  >
                    Tài nguyên
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* <div className="hidden lg:block w-full basis-2/6">
            {
              isLoggedIn ? (
                <div className="group relative cursor-pointer ">
                  <a
                  href="/#home"
                  className="flex h-[72px] items-center gap-[2px] "
                  >
                  <FaUserCircle size={30} className="mr-3"/>
                  <span className="font-semibold">{username}{" "}</span>
                  <span>
                    <FaCaretDown className="ml-2 transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </a>
                <div className="absolute -left-9 z-[9999] hidden rounded-md bg-white p-2 text-black group-hover:block shadow-md w-48 cursor-pointer">
                  <ul className="space-y-3">
                    {UserDropdownLinks.map((link) => (
                      <li key={link.name}>
                        <a
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20 text-center text-18"
                          href={link.link}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                    <li>
                        <button onClick={logout} className="font-semibold inline-block w-full rounded-md p-2 hover:bg-primary/20 text-xl"><LogoutOutlined /> Logout</button>
                    </li>
                  </ul>
                </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 font-semibold ">
                  <NavLink to="/sign-in" className="py-2 text-18 ">
                  <span className="text-black rounded-lg py-2 px-4 hover:bg-teal-800 hover:text-white hover:border-teal-800 border-2 border-white">Đăng Nhập</span>
                  </NavLink>
                  <NavLink to="/sign-up" className="py-4 text-18 ">
                    <span className="rounded-lg py-2 px-4 bg-[rgb(0,132,137)] text-white hover:bg-teal-800">Đăng Ký</span>
                  </NavLink>
                </div>
              )}
          </div>
          <div className="flex items-center gap-4 ">
            <div className="lg:hidden block">
              {showMenu ? (
                <HiMenuAlt1
                  onClick={toggleMenu}
                  className=" cursor-pointer transition-all"
                  size={30}
                />
              ) : (
                <HiMenuAlt3
                  onClick={toggleMenu}
                  className="cursor-pointer transition-all"
                  size={30}
                />
              )}
            </div>
          </div> */}
          </div>
        </div>
        {/* <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} /> */}
      </nav>
    </>
  );
}

export default Navbar;
